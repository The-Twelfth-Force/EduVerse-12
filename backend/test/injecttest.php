<?php
$mysqli = new mysqli("localhost", "root", "", "eduverse-12"); 

if (isset($_POST['submit'])) {
    // $email = $_POST['email'] ?? '';
    // $query = "SELECT * FROM User WHERE School_Email = '$email'";
    // $result = $mysqli->query($query);

    $stmt = $mysqli->prepare("SELECT * FROM User WHERE School_Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
}
?>

<form method="POST">
    <label>Email:</label>
    <input type="text" name="email" required>
    <button type="submit" name="submit">Search</button>
</form>

<?php if (isset($result)): ?>
    <h3>Results:</h3>
    <?php while ($row = $result->fetch_assoc()): ?>
        <pre><?php print_r($row); ?></pre>
    <?php endwhile; ?>
<?php endif; ?>

