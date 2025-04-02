<?php
/* 
Student Table
    StudentSSN CHAR(9) NOT NULL,
    Status CHAR(1) NOT NULL,
    PRIMARY KEY (StudentSSN),
    FOREIGN KEY (StudentSSN) REFERENCES Person(SSN)
*/
namespace App\Models;

include_once "../config/database.php";

class Student {
    private $conn;
    private $table = 'Student';

    // Properties
    public $studentSSN;
    public $status;

    // Constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all students
    public function getAll() {
        $query = 'SELECT p.*, s.Status 
                  FROM ' . $this->table . ' s
                  JOIN Person p ON s.StudentSSN = p.SSN';
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
    }

    // Get single student
    public function getSingle() {
        $query = 'SELECT p.*, s.Status 
                  FROM ' . $this->table . ' s
                  JOIN Person p ON s.StudentSSN = p.SSN
                  WHERE s.StudentSSN = ?';
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->studentSSN);
        $stmt->execute();
        
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        
        if($row) {
            $this->studentSSN = $row['SSN'];
            $this->status = $row['Status'];
            return true;
        }
        
        return false;
    }

    // Create student
    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
                  SET StudentSSN = :studentSSN, 
                      Status = :status';
        
        $stmt = $this->conn->prepare($query);
        
        // Clean data
        $this->studentSSN = htmlspecialchars(strip_tags($this->studentSSN));
        $this->status = htmlspecialchars(strip_tags($this->status));
        
        // Bind data
        $stmt->bindParam(':studentSSN', $this->studentSSN);
        $stmt->bindParam(':status', $this->status);
        
        // Execute query
        if($stmt->execute()) {
            return true;
        }
        
        printf("Error: %s.\n", $stmt->error);
        return false;
    }

    // Update student
    public function update() {
        $query = 'UPDATE ' . $this->table . '
                  SET Status = :status 
                  WHERE StudentSSN = :studentSSN';
        
        $stmt = $this->conn->prepare($query);
        
        // Clean data
        $this->studentSSN = htmlspecialchars(strip_tags($this->studentSSN));
        $this->status = htmlspecialchars(strip_tags($this->status));
        
        // Bind data
        $stmt->bindParam(':studentSSN', $this->studentSSN);
        $stmt->bindParam(':status', $this->status);
        
        // Execute query
        if($stmt->execute()) {
            return true;
        }
        
        printf("Error: %s.\n", $stmt->error);
        return false;
    }

    // Delete student
    public function delete() {
        $query = 'DELETE FROM ' . $this->table . ' WHERE StudentSSN = :studentSSN';
        
        $stmt = $this->conn->prepare($query);
        
        // Clean data
        $this->studentSSN = htmlspecialchars(strip_tags($this->studentSSN));
        
        // Bind data
        $stmt->bindParam(':studentSSN', $this->studentSSN);
        
        // Execute query
        if($stmt->execute()) {
            return true;
        }
        
        printf("Error: %s.\n", $stmt->error);
        return false;
    }
}