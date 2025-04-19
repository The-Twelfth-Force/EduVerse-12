<?php
session_start();
require_once '../db/db.php';  // adjust if needed
require_once '../classes/Student.php';  // adjust if needed

if (!isset($_SESSION['userID']) || $_SESSION['role'] !== 'Student') {
    header('Location: ../test/test.php');
    exit();
}

// Get sectionId from URL
$sectionId = $_GET['sectionId'] ?? null;

if (!$sectionId) {
    echo "No section selected.";
    exit();
}

// Load contents from database for this section
try {
    $stmt = $pdo->prepare("
        SELECT ContentID, Title, Description, UploadDate
        FROM Content
        WHERE SectionID = ?
    ");
    $stmt->execute([$sectionId]);
    $contents = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    echo "Error loading course materials.";
    exit();
}

// Group contents by type (Assignment, Project, Quiz)
$assignments = [];
$projects = [];
$quizzes = [];

foreach ($contents as $content) {
    $title = strtolower($content['Title']);
    if (strpos($title, 'assignment') !== false) {
        $assignments[] = $content;
    } elseif (strpos($title, 'project') !== false) {
        $projects[] = $content;
    } elseif (strpos($title, 'quiz') !== false || strpos($title, 'quizzes') !== false) {
        $quizzes[] = $content;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Dashboard - Course Materials</title>
</head>
<body>

<h1>Course Dashboard (Section ID: <?= htmlspecialchars($sectionId) ?>)</h1>

<h2>Assignments</h2>
<?php if (count($assignments) > 0): ?>
<table border="1">
    <tr><th>Title</th><th>Upload Date</th></tr>
    <?php foreach ($assignments as $assignment): ?>
        <tr>
            <td>
                <a href="test_upload_content.php?contentID=<?= $assignment['ContentID'] ?>&sectionID=<?= $sectionId ?>">
                    <?= htmlspecialchars($assignment['Title']) ?>
                </a>
            </td>
            <td><?= htmlspecialchars($assignment['UploadDate']) ?></td>
        </tr>
    <?php endforeach; ?>
</table>
<?php else: ?>
    <p>No assignments at this time</p>
<?php endif; ?>

<h2>Projects</h2>
<?php if (count($projects) > 0): ?>
<table border="1">
    <tr><th>Title</th><th>Upload Date</th></tr>
    <?php foreach ($projects as $project): ?>
        <tr>
            <td>
                <a href="test_upload_content.php?contentID=<?= $project['ContentID'] ?>&sectionID=<?= $sectionId ?>">
                    <?= htmlspecialchars($project['Title']) ?>
                </a>
            </td>
            <td><?= htmlspecialchars($project['UploadDate']) ?></td>
        </tr>
    <?php endforeach; ?>
</table>
<?php else: ?>
    <p>No projects at this time.</p>
<?php endif; ?>

<h2>Quizzes</h2>
<?php if (count($quizzes) > 0): ?>
<table border="1">
    <tr><th>Title</th><th>Upload Date</th></tr>
    <?php foreach ($quizzes as $quiz): ?>
        <tr>
            <td>
                <a href="test_upload_content.php?contentID=<?= $quiz['ContentID'] ?>&sectionID=<?= $sectionId ?>">
                    <?= htmlspecialchars($quiz['Title']) ?>
                </a>
            </td>
            <td><?= htmlspecialchars($quiz['UploadDate']) ?></td>
        </tr>
    <?php endforeach; ?>
</table>
<?php else: ?>
    <p>No quizzes at this time</p>
<?php endif; ?>

<br><br>

<a href="test_register.php">← Back to My Courses</a>

</body>
</html>
