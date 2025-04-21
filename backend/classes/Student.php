<?php
require_once __DIR__ . '/User.php';

class Student extends User {
    protected $pdo;
    protected $userId;
    protected $studentSSN;

    public function __construct($pdo, $userID) {
        parent::__construct($pdo);
        $this->pdo = $pdo;
        $this->userId = $userID;
    
        $stmt = $this->pdo->prepare("
            SELECT SSN FROM Person
            WHERE UserID = ?
        ");
        $stmt->execute([$userID]);
        $result = $stmt->fetch();
    
        if ($result) {
            $this->studentSSN = $result['SSN'];
        } else {
            throw new Exception('Student SSN not found for UserID: ' . $userID);
        }
    }
    

    
    // Function: Search for courses
    // This function will return all courses that match the search term
    public function searchCourses($searchTerm) {
        $stmt = $this->pdo->prepare("
            SELECT s.SectionID, s.SectionNum, s.Course_ID, s.Location, s.S_Info, s.S_Capacity, s.Date,
                   pe.F_Name, pe.L_Name
            FROM Section s
            LEFT JOIN Professor p ON s.ProfessorSSN = p.ProfessorSSN
            LEFT JOIN Person pe ON p.ProfessorSSN = pe.SSN
            WHERE s.SectionID LIKE ?
               OR s.SectionNum LIKE ?
               OR s.Course_ID LIKE ?
               OR s.Location LIKE ?
               OR s.S_Info LIKE ?
               OR s.Date LIKE ?
               OR pe.F_Name LIKE ?
               OR pe.L_Name LIKE ?
        ");
        $likeTerm = '%' . $searchTerm . '%';
        $stmt->execute([$likeTerm, $likeTerm, $likeTerm, $likeTerm, $likeTerm, $likeTerm, $likeTerm, $likeTerm]);
        return $stmt->fetchAll();
    }


    // Function: Register a course
    // This function will insert a new record into the Registered table
    public function registerCourse($sectionId) {
        $stmt = $this->pdo->prepare("
            INSERT INTO Registered (StudentSSN, SectionID)
            VALUES (?, ?)
        ");
        return $stmt->execute([$this->studentSSN, $sectionId]);
    }
    


    // Function: Drop a course
    // This function will remove the course from the Registered table

    public function dropCourse($sectionID) {
        $stmt = $this->pdo->prepare("
            DELETE FROM Registered
            WHERE StudentSSN = ? AND SectionID = ?
        ");
        return $stmt->execute([$this->studentSSN, $sectionID]);
    }
    
    

    
    // Function: View registered courses
    // This function will return all courses that the student is registered for
    // View registered courses
    public function viewRegisteredCourses() {
        $stmt = $this->pdo->prepare("
            SELECT s.SectionID, s.SectionNum, s.Course_ID, s.Location, s.Date, pe.F_Name, pe.L_Name
            FROM Registered r
            JOIN Section s ON r.SectionID = s.SectionID
            LEFT JOIN Professor p ON s.ProfessorSSN = p.ProfessorSSN
            LEFT JOIN Person pe ON p.ProfessorSSN = pe.SSN
            WHERE r.StudentSSN = ?
        ");
        $stmt->execute([$this->studentSSN]);
        return $stmt->fetchAll();
    }
    

    
}
?>
