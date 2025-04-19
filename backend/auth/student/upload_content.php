<?php
session_start();
require_once '../../db/db.php';

// Check if the user is logged in
if (!isset($_SESSION['userID'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

// Check if form data exists
if (
    !isset($_POST['sectionID']) ||
    !isset($_POST['type']) ||
    !isset($_POST['title']) ||
    !isset($_POST['description']) ||
    !isset($_FILES['file'])
) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Get form data
$sectionID = intval($_POST['sectionID']);
$type = trim($_POST['type']);
$title = trim($_POST['title']);
$description = trim($_POST['description']);
$file = $_FILES['file'];

// Upload directory
$uploadDir = '../../uploads/';

// Create uploads folder if not exist
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Generate unique filename to avoid conflicts
$filename = uniqid() . '_' . basename($file['name']);
$targetPath = $uploadDir . $filename;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Save record in database
    $stmt = $pdo->prepare("
        INSERT INTO Content (SectionID, Type, Title, Description, FilePath, UploadDate)
        VALUES (?, ?, ?, ?, ?, NOW())
    ");

    if ($stmt->execute([$sectionID, $type, $title, $description, $filename])) {
        echo json_encode(['success' => true, 'message' => 'Content uploaded successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to insert into database']);
    }
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
}
?>
