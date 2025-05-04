<?php
session_start();

// Handle logout
if (isset($_POST['logout'])) {
    $url = "http://localhost/EduVerse-12/backend/auth/logout.php";

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
        ],
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result, true);

    session_unset();
    session_destroy();

    // Redirect to same page to show login form again
    header("Location: test.php");
    exit();
}

// Handle login
if (isset($_POST['login'])) {
    $email = $_POST['school_email'] ?? '';
    $password = $_POST['password'] ?? '';

    $url = "http://localhost/EduVerse-12/backend/auth/login.php";

    $data = http_build_query([
        'school_email' => $email,
        'password' => $password
    ]);

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => $data,
        ],
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result, true);

    if ($response && $response['success']) {
        $_SESSION['userID'] = $response['userID'];
        $_SESSION['schoolEmail'] = $response['schoolEmail'];
        $_SESSION['role'] = $response['role']; // This keeps track of the role (student, professor)
        $loginSuccess = true;
    } else {
        echo "<h2>Login Failed</h2>";
        echo "<p style='color: red;'>" . ($response['message'] ?? 'Unknown error') . "</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test Login</title>
</head>
<body>

<?php if (!isset($_SESSION['userID'])): ?>
    <form method="POST" action="test.php">
        <h1>Login</h1>
        <label>Email:</label><br>
        <input type="text" name="school_email" required><br><br>

        <label>Password:</label><br>
        <input type="password" name="password" required><br><br>

        <button type="submit" name="login">Login</button>
    </form>
<?php else: ?>
    <h1>You're logged in as <?= htmlspecialchars($_SESSION['schoolEmail']) ?></h1>
    <h2>Role: <?= htmlspecialchars($_SESSION['role']) ?></h2>  <!-- PRINITNG THE ROLE -->
    <h2>Login Successful ✅</h2>

    <?php if ($_SESSION['role'] === 'Student'): ?>
    <form method="GET" action="test_register.php">
        <button type="submit">Go to Registration Page (Student)</button>
    </form>
    <?php elseif ($_SESSION['role'] === 'Professor'): ?>
        <form method="GET" action="test_professor_register.php">
            <button type="submit">Go to Registration Page (Professor)</button>
        </form>
    <?php endif; ?>


    <form method="POST" action="test.php">
        <button type="submit" name="logout">Logout</button>
    </form>
<?php endif; ?>

</body>
</html>
