<?php
session_start();
if (!isset($_SESSION['userID']) || $_SESSION['role'] !== 'Professor') {
    header('Location: test.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Professor Portal - Manage Sections</title>
</head>
<body>

<h1>Professor Portal - Manage Courses & Sections</h1>

<input type="text" id="searchInput" placeholder="Search Sections..." autocomplete="off">

<!-- Create Course/Section button -->
<button id="createCourseBtn">Create Course or Section</button>

<br><br>

<button id="viewSectionsBtn">View My Sections</button>

<div id="searchResults"></div>


<!-- Create Course Form -->
<div id="createCourseForm" style="display:none; margin-top: 20px;">
    <form id="courseForm">
        <h2>Create New Course / Section</h2>

        <label>Course ID:</label><br>
        <input type="text" name="course_id" required><br>

        <label>Course Name:</label><br>
        <input type="text" name="c_name" required><br>

        <label>Department:</label><br>
        <input type="text" name="department" required><br>

        <label>Section Number:</label><br>
        <input type="number" name="section_num" required><br>

        <label>Location:</label><br>
        <input type="text" name="location" required><br>

        <label>Section Info:</label><br>
        <input type="text" name="s_info" required><br>

        <label>Section Capacity:</label><br>
        <input type="number" name="s_capacity" required><br>

        <label>Days/Time:</label><br>
        <input type="text" name="date" required><br><br>

        <button type="button" id="submitCourseBtn">Submit Course/Section</button>
    </form>
</div>


<script src="../js/professor_portal.js?v=2"></script>

<script>
// Show modal
document.getElementById('createCourseBtn').addEventListener('click', () => {
    document.getElementById('createCourseModal').style.display = 'block';
});

// Hide modal
function closeModal() {
    document.getElementById('createCourseModal').style.display = 'none';
}
</script>

</body>
</html>
