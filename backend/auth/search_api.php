<?php
require_once '../db.php';
require_once '../classes/Student.php';

session_start();

// Check if user is logged in
if (!isset($_SESSION['userID'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

// Check if search query is provided
if (!isset($_GET['query'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No search query provided']);
    exit();
}

$searchTerm = trim($_GET['query']);

try {
    $student = new Student($pdo, $_SESSION['userID']);
    $courses = $student->searchCourses($searchTerm);

    echo json_encode(['courses' => $courses]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'details' => $e->getMessage()]);
}
?>
