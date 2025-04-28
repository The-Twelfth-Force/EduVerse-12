<?php
session_start();

// Set headers
header('Content-Type: application/json');

// If session exists, destroy it
if (isset($_SESSION['userID'])) {
    session_unset();
    session_destroy();

    echo json_encode([
        'success' => true,
        'message' => 'Logged out successfully.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'No active session found.'
    ]);
}
?>
