<?php
session_start();
if (!isset($_SESSION['userID'])) {
    echo "You must login first.";
    exit();
}

// Example: Hardcoding sectionID for now (you can change it later)
$sectionID = $_GET['sectionID'] ?? 98; // default section 98
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Upload Content</title>
</head>
<body>

<h1>Upload Course Material (Section ID: <?= htmlspecialchars($sectionID) ?>)</h1>

<form action="../auth/student/upload_content.php" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="sectionID" value="<?= htmlspecialchars($sectionID) ?>">

    <label>Type:</label><br>
    <select name="type" required>
        <option value="Assignment">Assignment</option>
        <option value="Project">Project</option>
        <option value="Quiz">Quiz</option>
    </select><br><br>

    <label>Title:</label><br>
    <input type="text" name="title" required><br><br>

    <label>Description:</label><br>
    <textarea name="description" rows="4" cols="50" required></textarea><br><br>

    <label>Upload File:</label><br>
    <input type="file" name="file" required><br><br>

    <button type="submit">Upload Content</button>
</form>

</body>
</html>
