<?php
session_start();
require_once '../db/db.php';  
require_once '../classes/Professor.php';  

if (!isset($_SESSION['userID']) || $_SESSION['role'] !== 'Professor') {
    header('Location: ../test/test.php');
    exit();
}

$sectionId = $_GET['sectionId'] ?? null;

if (!$sectionId) {
    echo "No section selected.";
    exit();
}

// Handle Add or Drop Student
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'dropStudent' && isset($_POST['drop_student_email'])) {
        $dropEmail = $_POST['drop_student_email'];

        // Find SSN from email
        $stmt = $pdo->prepare("
            SELECT p.SSN
            FROM Person p
            JOIN User u ON p.UserID = u.UserID
            WHERE u.School_Email = ?
        ");
        $stmt->execute([$dropEmail]);
        $student = $stmt->fetch();

        if ($student) {
            // Delete from Registered
            $stmt = $pdo->prepare("DELETE FROM Registered WHERE StudentSSN = ? AND SectionID = ?");
            $stmt->execute([$student['SSN'], $sectionId]);
        }
    }

    if ($action === 'addStudent' && isset($_POST['student_email'])) {
        $addEmail = $_POST['student_email'];

        // Find SSN
        $stmt = $pdo->prepare("
            SELECT p.SSN
            FROM Person p
            JOIN User u ON p.UserID = u.UserID
            WHERE u.School_Email = ?
        ");
        $stmt->execute([$addEmail]);
        $student = $stmt->fetch();

        if ($student) {
            // Insert into Registered
            $stmt = $pdo->prepare("INSERT INTO Registered (StudentSSN, SectionID) VALUES (?, ?)");
            $stmt->execute([$student['SSN'], $sectionId]);
        }
    }
}

// Load enrolled students
$stmt = $pdo->prepare("
    SELECT u.School_Email, p.F_Name, p.L_Name
    FROM Registered r
    JOIN Person p ON r.StudentSSN = p.SSN
    JOIN User u ON p.UserID = u.UserID
    WHERE r.SectionID = ?
");
$stmt->execute([$sectionId]);
$students = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Professor Course Dashboard</title>
</head>
<body>

<h1>Professor Dashboard - Manage Content (Section ID: <?= htmlspecialchars($sectionId) ?>)</h1>

<h2>Assignments 
    <button onclick="ProfessorDashboard.showCreateForm('Assignment')">Create Assignment</button>
</h2>
<div id="assignmentsList"></div>

<h2>Projects 
    <button onclick="ProfessorDashboard.showCreateForm('Project')">Create Project</button>
</h2>
<div id="projectsList"></div>

<h2>Quizzes 
    <button onclick="ProfessorDashboard.showCreateForm('Quiz')">Create Quiz</button>
</h2>
<div id="quizzesList"></div>

<h2>Students Enrolled
    <button onclick="document.getElementById('addStudentForm').style.display = 'block'">Add Student</button>
</h2>

<?php if (count($students) > 0): ?>
<table border="1">
    <tr><th>Name</th><th>Email</th><th>Action</th></tr>
    <?php foreach ($students as $student): ?>
        <tr>
            <td><?= htmlspecialchars($student['F_Name'] . ' ' . $student['L_Name']) ?></td>
            <td>
                <a href="mailto:<?= htmlspecialchars($student['School_Email']) ?>">
                    <?= htmlspecialchars($student['School_Email']) ?>
                </a>
            </td>
            <td>
                <form method="POST" action="test_professor_dashboard.php?sectionId=<?= htmlspecialchars($sectionId) ?>">
                    <input type="hidden" name="drop_student_email" value="<?= htmlspecialchars($student['School_Email']) ?>">
                    <button type="submit" name="action" value="dropStudent">Drop</button>
                </form>
            </td>
        </tr>
    <?php endforeach; ?>
</table>
<?php else: ?>
    <p>No students enrolled yet.</p>
<?php endif; ?>

<!-- Add Student Form (Hidden by Default) -->
<div id="addStudentForm" style="display:none; margin-top:20px;">
    <form method="POST" action="test_professor_dashboard.php?sectionId=<?= htmlspecialchars($sectionId) ?>">
        <label>Student Email:</label><br>
        <input type="text" name="student_email" required><br><br>
        <button type="submit" name="action" value="addStudent">Add Student</button>
    </form>
</div>

<br><br>

<a href="../test/test_professor_register.php">← Back to My Sections</a>

<!-- Modal to Create Assignment/Project/Quiz -->
<div id="createContentModal" style="display:none; margin-top: 20px;">
    <h3 id="createContentTitle"></h3>
    <form id="createContentForm" enctype="multipart/form-data">
        <input type="hidden" name="section_id" value="<?= htmlspecialchars($sectionId) ?>">
        <input type="hidden" name="content_type" id="contentTypeField">

        <label>Title:</label><br>
        <input type="text" name="title" required><br>

        <label>Description:</label><br>
        <textarea name="description" required></textarea><br>

        <label>Upload File (optional):</label><br>
        <input type="file" name="file"><br><br>

        <button type="button" onclick="ProfessorDashboard.submitContent()">Submit</button>
        <button type="button" onclick="ProfessorDashboard.hideCreateForm()">Cancel</button>
    </form>
</div>

<script src="../js/professor_dashboard.js"></script>

</body>
</html>
