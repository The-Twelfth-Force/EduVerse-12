<?php
session_start();
require_once '../../db/db.php';  
require_once '../../classes/Professor.php';  

header('Content-Type: application/json');

if (!isset($_SESSION['userID']) || $_SESSION['role'] !== 'Professor') {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit();
}

// Capture action
$action = $_POST['action'] ?? null;

// Create Professor object
$professor = new Professor($pdo, $_SESSION['userID']);

try {
    if ($action === 'viewSections') {
        $sections = $professor->viewMySections();
        echo json_encode(['success' => true, 'sections' => $sections]);
    
    } elseif ($action === 'addSection') {
        $sectionId = $_POST['sectionId'] ?? null;
        if (!$sectionId) {
            throw new Exception('Section ID missing.');
        }
        $professor->addSectionToTeach($sectionId);
        echo json_encode(['success' => true, 'message' => 'Section added successfully.']);

    } else {
        // Default = createCourseOrSection if no action or unknown action
        // Validate fields
        $requiredFields = ['course_id', 'c_name', 'department', 'section_num', 'location', 's_info', 's_capacity', 'date'];

        foreach ($requiredFields as $field) {
            if (empty($_POST[$field])) {
                throw new Exception("Missing field: $field");
            }
        }

        // Capture the data
        $courseID = trim($_POST['course_id']);
        $cName = trim($_POST['c_name']);
        $department = trim($_POST['department']);
        $sectionNum = trim($_POST['section_num']);
        $location = trim($_POST['location']);
        $sInfo = trim($_POST['s_info']);
        $sCapacity = trim($_POST['s_capacity']);
        $date = trim($_POST['date']);

        // Check if course exists
        $stmt = $pdo->prepare("SELECT * FROM Course WHERE Course_ID = ?");
        $stmt->execute([$courseID]);
        $course = $stmt->fetch();

        if (!$course) {
            // Course doesn't exist → Insert into Course
            $stmt = $pdo->prepare("INSERT INTO Course (Course_ID, C_Name, Department) VALUES (?, ?, ?)");
            $stmt->execute([$courseID, $cName, $department]);
        }

        // Insert into Section
        $profSSN = $professor->getSSN();

        $stmt = $pdo->prepare("
            INSERT INTO Section (SectionNum, Course_ID, Location, S_Info, S_Capacity, Date, ProfessorSSN)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$sectionNum, $courseID, $location, $sInfo, $sCapacity, $date, $profSSN]);

        echo json_encode(['success' => true, 'message' => 'Course and Section created successfully.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
?>
