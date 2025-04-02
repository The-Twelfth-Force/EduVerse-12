<?php
class Database {
    private $host = "localhost";
    private $db_name;
    private $username = "root";
    private $password;
    public $conn;

    public function __construct() {
        $this->db_name = "elearning2";
        $this->password = getenv('MYSQL_ROOT_PASSWORD');
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Connection error: " . $e->getMessage();
        }
        return $this->conn;
    }
    public function query($sql, $params = []) {
        $stmt = $this->conn->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->execute();
        return $stmt;
    }
}