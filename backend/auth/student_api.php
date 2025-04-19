<?php
session_start();
require_once '../db/db.php';
require_once '../classes/Student.php';

if (!isset($_SESSION['userID'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$student = new Student($pdo, $_SESSION['userID']);
$action = $_POST['action'] ?? '';

switch ($action) {
    case 'register':
        $sectionId = $_POST['sectionId'] ?? null;
        if ($sectionId && $student->registerCourse($sectionId)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to register.']);
        }
        break;

    case 'viewRegistered':
        $courses = $student->viewRegisteredCourses();
        echo json_encode(['courses' => $courses]);
        break;

    case 'drop':
        $sectionId = $_POST['sectionId'] ?? null;
        if ($sectionId && $student->dropCourse($sectionId)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to drop.']);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>
