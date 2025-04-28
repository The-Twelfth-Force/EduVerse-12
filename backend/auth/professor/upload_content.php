<?php
session_start();
require_once '../../db/db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['userID']) || $_SESSION['role'] !== 'Professor') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$sectionId = $_POST['section_id'] ?? null;
$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';
$contentType = $_POST['content_type'] ?? '';

if (!$sectionId || !$title || !$description || !$contentType) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Handle file upload
$filePath = null;
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../../uploads/';
    $fileName = uniqid() . '_' . basename($_FILES['file']['name']);
    $targetPath = $uploadDir . $fileName;

    if (!move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
        echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
        exit();
    }
    $filePath = $fileName;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO Content (SectionID, Title, Description, FilePath, UploadDate, ContentType)
        VALUES (?, ?, ?, ?, NOW(), ?)
    ");
    $stmt->execute([$sectionId, $title, $description, $filePath, $contentType]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server Error: ' . $e->getMessage()]);
}
?>
