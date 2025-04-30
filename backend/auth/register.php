<?php
header('Content-Type: application/json');

$required = ['school_email', 'password', 'role', 'first_name', 'last_name', 'ssn', 'sex', 'enrollment_date'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(['success' => false, 'message' => "Missing field: $field"]);
        exit();
    }
}

$school_email = $_POST['school_email'];
$password = $_POST['password'];
$role = $_POST['role'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$ssn = $_POST['ssn'];
$sex = $_POST['sex'];
$enrollment_date = $_POST['enrollment_date'];

try {
    $pdo = new PDO("mysql:host=localhost;dbname=eduverse-12", "root", ""); // update creds
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if email or SSN already exists
    $stmt = $pdo->prepare("SELECT * FROM User WHERE School_Email = ?");
    $stmt->execute([$school_email]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT * FROM Person WHERE SSN = ?");
    $stmt->execute([$ssn]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'SSN already exists']);
        exit();
    }

    // Insert into User table
    $stmt = $pdo->prepare("INSERT INTO User (UserID, School_Email, Password) VALUES (NULL, ?, ?)");
    $stmt->execute([$school_email, $password]);
    $userID = $pdo->lastInsertId();

    // Insert into Person table
    $stmt = $pdo->prepare("
        INSERT INTO Person (SSN, F_Name, L_Name, Sex, Enrollment_Date, UserID)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$ssn, $first_name, $last_name, $sex, $enrollment_date, $userID]);

    // Insert into Student or Professor table
    if ($role === "Student") {
        $stmt = $pdo->prepare("INSERT INTO Student (SSN, Status) VALUES (?, 'Active')");
        $stmt->execute([$ssn]);
    } elseif ($role === "Professor") {
        $stmt = $pdo->prepare("
            INSERT INTO Professor (ProfessorSSN, Salary, Department)
            VALUES (?, 50000.00, 'Computer Science')
        ");
        $stmt->execute([$ssn]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid role specified']);
        exit();
    }

    echo json_encode(['success' => true, 'message' => 'Account created successfully', 'userID' => $userID]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'DB Error: ' . $e->getMessage()]);
}
