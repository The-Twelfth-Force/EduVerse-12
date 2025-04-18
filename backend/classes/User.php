<?php
require_once __DIR__ . '/../db.php';

class User {
    protected $pdo;
    protected $userID;
    protected $schoolEmail;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Attempt to login the user
    public function login($email, $password) {
        $stmt = $this->pdo->prepare("SELECT * FROM User WHERE School_Email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
    
        if ($user && $user['Password'] === $password) { // Plaintext password check
            $_SESSION['userID'] = $user['UserID'];
            $_SESSION['schoolEmail'] = $user['School_Email'];
    
            $this->userID = $user['UserID'];
            $this->schoolEmail = $user['School_Email'];
    
            return true;
        } else {
            return false;
        }
    }
    
    
    // Check if the user is logged in
    public function isLoggedIn() {
        return isset($_SESSION['userID']) && isset($_SESSION['schoolEmail']);
    }

    // Logout the user
    public function logout() {
        session_unset();
        session_destroy();
    }
}
?>
