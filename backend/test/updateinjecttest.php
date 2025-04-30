<?php
$mysqli = new mysqli("localhost", "root", "", "eduverse-12");

if (isset($_POST['submit'])) {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $query = "UPDATE User SET Password = '$password' WHERE School_Email = '$email'";
    $mysqli->query($query);
}
?>

<form method="POST">
    <label>Email:</label>
    <input type="text" name="email" required>
    <label>New Password:</label>
    <input type="text" name="password" required>
    <button type="submit" name="submit">Update</button>
</form>
