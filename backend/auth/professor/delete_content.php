<?php
session_start();
require_once '../../db/db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['userID']) || $_SESSION['role'] !== 'Professor') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$contentId = $_POST['contentId'] ?? null;

if (!$contentId) {
    echo json_encode(['success' => false, 'message' => 'Missing content ID']);
    exit();
}

try {
    // Optionally you can also delete the file from uploads folder
    $stmt = $pdo->prepare("DELETE FROM Content WHERE ContentID = ?");
    $stmt->execute([$contentId]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server Error: ' . $e->getMessage()]);
}
?>
