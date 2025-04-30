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
        $loginError = $response['message'] ?? 'Unknown error';
    }
}

// Handle account creation form display
if (isset($_POST['show_create_account'])) {
    $showCreateAccountForm = true;
}

// Handle create account submission
if (isset($_POST['create_account_submit'])) {
    $email = $_POST['school_email'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    $role = $_POST['role'] ?? '';
    $firstName = $_POST['first_name'] ?? '';
    $lastName = $_POST['last_name'] ?? '';
    $ssn = $_POST['ssn'] ?? '';
    $sex = $_POST['sex'] ?? '';
    $enrollmentDate = $_POST['enrollment_date'] ?? '';


    // Basic validation
    $errors = [];
    if (empty($email)) {
        $errors[] = "Email is required";
    }
    if (empty($password)) {
        $errors[] = "Password is required";
    }
    if ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match";
    }
    if (empty($role)) {
        $errors[] = "Role is required";
    }
    if (empty($firstName)) {
        $errors[] = "First name is required";
    }
    if (empty($lastName)) {
        $errors[] = "Last name is required";
    }

    if (empty($errors)) {
        $url = "http://localhost/EduVerse-12/backend/auth/register.php";

        $data = http_build_query([
            'school_email' => $email,
            'password' => $password,
            'role' => $role,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'ssn' => $ssn,
            'sex' => $sex,
            'enrollment_date' => $enrollmentDate
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
            $registrationSuccess = true;
            $showCreateAccountForm = false;
        } else {
            $registrationError = $response['message'] ?? 'Unknown error occurred during registration';
            $showCreateAccountForm = true;
        }
    } else {
        $showCreateAccountForm = true;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EduVerse - Login/Register</title>
    <style>
        .error {
            color: red;
            margin-bottom: 10px;
        }
        .success {
            color: green;
            margin-bottom: 10px;
        }
        .form-group {
            margin-bottom: 15px;
        }
    </style>
</head>
<body>

<?php if (isset($registrationSuccess) && $registrationSuccess): ?>
    <div class="success">
        <h2>Registration Successful ✅</h2>
        <p>Your account has been created successfully. You can now login.</p>
    </div>
    <form method="POST" action="test.php">
        <button type="submit">Back to Login</button>
    </form>

<?php elseif (isset($showCreateAccountForm) && $showCreateAccountForm): ?>
    <h1>Create New Account</h1>
    
    <?php if (isset($errors) && !empty($errors)): ?>
        <div class="error">
            <ul>
                <?php foreach ($errors as $error): ?>
                    <li><?= htmlspecialchars($error) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>
    
    <?php if (isset($registrationError)): ?>
        <div class="error">
            <p><?= htmlspecialchars($registrationError) ?></p>
        </div>
    <?php endif; ?>
    
    <form method="POST" action="test.php">
        <div class="form-group">
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" value="<?= htmlspecialchars($_POST['first_name'] ?? '') ?>" required>
        </div>

        <div class="form-group">
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" value="<?= htmlspecialchars($_POST['last_name'] ?? '') ?>" required>
        </div>

        <div class="form-group">
            <label for="ssn">SSN (9 digits):</label>
            <input type="text" id="ssn" name="ssn" maxlength="9" pattern="\d{9}" value="<?= htmlspecialchars($_POST['ssn'] ?? '') ?>" required>
        </div>

        <div class="form-group">
            <label for="sex">Sex:</label>
            <select id="sex" name="sex" required>
                <option value="">-- Select Sex --</option>
                <option value="M" <?= (isset($_POST['sex']) && $_POST['sex'] == 'M') ? 'selected' : '' ?>>Male</option>
                <option value="F" <?= (isset($_POST['sex']) && $_POST['sex'] == 'F') ? 'selected' : '' ?>>Female</option>
            </select>
        </div>

        <div class="form-group">
            <label for="enrollment_date">Enrollment Date:</label>
            <input type="date" id="enrollment_date" name="enrollment_date" value="<?= htmlspecialchars($_POST['enrollment_date'] ?? date('Y-m-d')) ?>" required>
        </div>

        <div class="form-group">
            <label for="school_email">School Email:</label>
            <input type="email" id="school_email" name="school_email" value="<?= htmlspecialchars($_POST['school_email'] ?? '') ?>" required>
        </div>

        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>

        <div class="form-group">
            <label for="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" required>
        </div>

        <div class="form-group">
            <label for="role">Role:</label>
            <select id="role" name="role" required>
                <option value="">-- Select Role --</option>
                <option value="Student" <?= (isset($_POST['role']) && $_POST['role'] == 'Student') ? 'selected' : '' ?>>Student</option>
                <option value="Professor" <?= (isset($_POST['role']) && $_POST['role'] == 'Professor') ? 'selected' : '' ?>>Professor</option>
            </select>
        </div>

        <button type="submit" name="create_account_submit">Register</button>
        <button type="submit">Back to Login</button>
    </form>

<?php elseif (isset($_SESSION['userID']) && isset($_SESSION['schoolEmail']) && isset($_SESSION['role'])): ?>
    <!-- User is logged in -->
    <h1>You're logged in as <?= htmlspecialchars($_SESSION['schoolEmail']) ?></h1>
    <h2>Role: <?= htmlspecialchars($_SESSION['role']) ?></h2>
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
    
<?php else: ?>
    <!-- Show login form when not logged in -->
    <h1>EduVerse Login</h1>
    
    <?php if (isset($loginError)): ?>
        <div class="error">
            <p><?= htmlspecialchars($loginError) ?></p>
        </div>
    <?php endif; ?>
    
    <form method="POST" action="test.php">
        <div class="form-group">
            <label for="login_email">School Email:</label>
            <input type="email" id="login_email" name="school_email" required>
        </div>
        
        <div class="form-group">
            <label for="login_password">Password:</label>
            <input type="password" id="login_password" name="password" required>
        </div>
        
        <button type="submit" name="login">Login</button>
        <button type="submit" name="show_create_account">Create Account</button>
    </form>
<?php endif; ?>

</body>
</html>