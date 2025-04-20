<?php
require_once __DIR__ . '/User.php';

class Professor extends User {
    protected $pdo;
    protected $userId;
    protected $professorSSN;

    public function __construct($pdo, $userID) {
        parent::__construct($pdo);
        $this->pdo = $pdo;
        $this->userId = $userID;

        // Map userID to ProfessorSSN
        $stmt = $this->pdo->prepare("
            SELECT SSN FROM Person
            WHERE UserID = ?
        ");
        $stmt->execute([$userID]);
        $result = $stmt->fetch();

        if ($result) {
            $this->professorSSN = $result['SSN'];
        } else {
            throw new Exception('Professor SSN not found for UserID: ' . $userID);
        }
    }

    // Add a Section (professor teaches this section)
    public function addSectionToTeach($sectionID) {
        $stmt = $this->pdo->prepare("
            UPDATE Section
            SET ProfessorSSN = ?
            WHERE SectionID = ?
        ");
        return $stmt->execute([$this->professorSSN, $sectionID]);
    }

    // View sections that this professor teaches
    public function viewMySections() {
        $stmt = $this->pdo->prepare("
            SELECT SectionID, SectionNum, Course_ID, Location, Date
            FROM Section
            WHERE ProfessorSSN = ?
        ");
        $stmt->execute([$this->professorSSN]);
        return $stmt->fetchAll();
    }

    // Return Professor SSN
    public function getSSN() {
        return $this->professorSSN;
    }

    // Drop a Section (professor no longer teaches this section)
    public function dropSectionFromTeach($sectionID) {
        error_log("Trying to drop SectionID: $sectionID for ProfessorSSN: $this->professorSSN");
    
        $stmt = $this->pdo->prepare("
            DELETE FROM Section
            WHERE SectionID = ? AND ProfessorSSN = ?
        ");
        $success = $stmt->execute([$sectionID, $this->professorSSN]);
    
        if (!$success) {
            error_log('Failed to execute DELETE query.');
        } else {
            error_log('DELETE query executed.');
        }
    
        return $success;
    }
    
    
    
}
?>
