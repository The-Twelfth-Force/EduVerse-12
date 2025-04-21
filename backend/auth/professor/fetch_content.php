<?php
require_once '../../db/db.php';

header('Content-Type: application/json');

$sectionId = $_GET['sectionId'] ?? null;

if (!$sectionId) {
    echo json_encode(['contents' => []]);
    exit();
}

$stmt = $pdo->prepare("
    SELECT ContentID, Title, Description, UploadDate, ContentType
    FROM Content
    WHERE SectionID = ?
    AND IsStudentUpload = 0

");
$stmt->execute([$sectionId]);
$contents = $stmt->fetchAll();

echo json_encode(['contents' => $contents]);
?>
