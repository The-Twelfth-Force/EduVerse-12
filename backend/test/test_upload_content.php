<?php
session_start();
require_once '../db/db.php'; // connect to database

if (!isset($_SESSION['userID'])) {
    echo "You must login first.";
    exit();
}

// Get sectionID and contentID
$sectionID = $_GET['sectionID'] ?? null;
$contentID = $_GET['contentID'] ?? null;

if (!$sectionID) {
    echo "Missing section.";
    exit();
}

// Only fetch assignment info if contentID exists
$assignment = null;
if ($contentID) {
    try {
        $stmt = $pdo->prepare("SELECT Title, Description, FilePath FROM Content WHERE ContentID = ?");
        $stmt->execute([$contentID]);
        $assignment = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        // fail silently
    }
}

// Handle student submission (when they click Submit)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sectionID = $_POST['sectionID'] ?? null;
    $type = $_POST['type'] ?? '';
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';

    if (!$sectionID || !$title || !$description || empty($_FILES['file']['name'])) {
        echo "<script>alert('All fields are required.'); window.history.back();</script>";
        exit();
    }

    // Handle uploaded file
    $fileName = uniqid() . '_' . basename($_FILES['file']['name']);
    $uploadPath = __DIR__ . '/../uploads/' . $fileName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadPath)) {
        try {
            // Save uploaded student file in Content table (optional depending on design)
            $stmt = $pdo->prepare("
                INSERT INTO Content (SectionID, Title, Description, FilePath, ContentType, UploadDate, IsStudentUpload)
                VALUES (?, ?, ?, ?, ?, NOW(), 1)
            ");
            $stmt->execute([$sectionID, $title, $description, $fileName, $type]);


            echo "<script>alert('Upload successful!'); window.location.href = 'test_student_dashboard.php?sectionId=" . urlencode($sectionID) . "';</script>";
            exit();
        } catch (Exception $e) {
            echo "<script>alert('Database error while saving.'); window.history.back();</script>";
            exit();
        }
    } else {
        echo "<script>alert('Failed to upload file.'); window.history.back();</script>";
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Submit Assignment</title>
</head>
<body>

<h1>Submit Your Work (Section ID: <?= htmlspecialchars($sectionID) ?>)</h1>

<?php if ($assignment): ?>
    <h2><?= htmlspecialchars($assignment['Title']) ?></h2>
    <p><strong>Description:</strong> <?= nl2br(htmlspecialchars($assignment['Description'])) ?></p>

    <?php if (!empty($assignment['FilePath'])): ?>
        <p>
            <strong>Professor's Uploaded File:</strong><br>
            <a href="../uploads/<?= htmlspecialchars($assignment['FilePath']) ?>" download>Download Assignment File</a>
        </p>
    <?php else: ?>
        <p>No file uploaded by professor.</p>
    <?php endif; ?>

    <hr>
<?php endif; ?>

<!-- Student submits their answer here -->
<form action="" method="POST" enctype="multipart/form-data">
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

    <button type="submit">Submit</button>
</form>

</body>
</html>
