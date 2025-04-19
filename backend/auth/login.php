<?php

// Displaying all the errors in the terminal for better debugging and testing
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// This will always start the session first
session_start();

// Now I will set handlers for the json response
header('Content-Type: application/json');


// Include the database connection and user class
require_once '../db/db.php';
require_once '../classes/user.php';



// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method. POST required.'
    ]);
    exit();
}

// Validate Rquired fields
if (empty($_POST['school_email']) || empty($_POST['password'])) {
    http_response_code(400); // Bad Request
    echo json_encode([
        'success' => false,
        'message' => 'Required fields are missing.'
    ]);
    exit();
}

$email = trim($_POST['school_email']);
$password = trim($_POST['password']);


// Creating the user object and logging in attempt
$user = new User($pdo);

if ($user->login($email, $password)) {
    try {
        $stmt = $pdo->prepare("SELECT SSN FROM Person WHERE UserID = ?");
        $stmt->execute([$_SESSION['userID']]);
        $person = $stmt->fetch();

        if ($person && !empty($person['SSN'])) {
            $ssn = $person['SSN'];

            // Default to Professor first
            $role = 'Professor'; // assume professor

            // Check Student
            $stmt = $pdo->prepare("SELECT SSN FROM Student WHERE SSN = ?");
            $stmt->execute([$ssn]);
            if ($stmt->fetch()) {
                $role = 'Student';
            }

            $_SESSION['role'] = $role;

            // ✅ No need to check again
            // ✅ No "Unknown" possibility now
        } else {
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'message' => 'SSN not found for user.'
            ]);
            exit();
        }

        // Login success
        echo json_encode([
            'success' => true,
            'message' => 'Login successful.',
            'userID' => $_SESSION['userID'],
            'schoolEmail' => $_SESSION['schoolEmail'],
            'role' => $_SESSION['role']
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error during role detection: ' . $e->getMessage()
        ]);
    }
} else {
    // Login failed
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email or password.'
    ]);
}




?>

