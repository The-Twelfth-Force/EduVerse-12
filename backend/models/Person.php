<?php
/* 
Person Table
    SSN CHAR(9) NOT NULL,
    F_Name VARCHAR(50) NOT NULL,
    M_Initial CHAR(1) NULL,
    L_Name VARCHAR(50) NOT NULL,
    Sex CHAR(1) NOT NULL,
    Enrollment_Date DATE NULL,
    Building_num VARCHAR(10) NULL,
    Street VARCHAR(50) NULL,
    Apt_num VARCHAR(10) NULL,
    City VARCHAR(50) NULL,
    AState CHAR(2) NULL,
    Zip CHAR(10) NULL,
    UserID INT NULL,
    PRIMARY KEY (SSN),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
*/
namespace App\Models;

use Database;

include_once "../config/database.php";
class Person
{
    private $ssn;
    private $fName;
    private $mInitial;
    private $lName;
    private $sex;
    private $enrollmentDate;
    private $buildingNum;
    private $street;
    private $aptNum;
    private $city;
    private $aState;
    private $zip;
    private $userId;

    // Constructor
    public function __construct(
        $ssn = null, 
        $fName = null, 
        $mInitial = null, 
        $lName = null, 
        $sex = null,
        $enrollmentDate = null, 
        $buildingNum = null, 
        $street = null, 
        $aptNum = null,
        $city = null, 
        $aState = null, 
        $zip = null, 
        $userId = null
    ) {
        $this->ssn = $ssn;
        $this->fName = $fName;
        $this->mInitial = $mInitial;
        $this->lName = $lName;
        $this->sex = $sex;
        $this->enrollmentDate = $enrollmentDate;
        $this->buildingNum = $buildingNum;
        $this->street = $street;
        $this->aptNum = $aptNum;
        $this->city = $city;
        $this->aState = $aState;
        $this->zip = $zip;
        $this->userId = $userId;
    }

    // Getters and setters
    public function getSSN() { return $this->ssn; }
    public function getFName() { return $this->fName; }
    public function getMInitial() { return $this->mInitial; }
    public function getLName() { return $this->lName; }
    public function getSex() { return $this->sex; }
    public function getEnrollmentDate() { return $this->enrollmentDate; }
    public function getBuildingNum() { return $this->buildingNum; }
    public function getStreet() { return $this->street; }
    public function getAptNum() { return $this->aptNum; }
    public function getCity() { return $this->city; }
    public function getAState() { return $this->aState; }
    public function getZip() { return $this->zip; }
    public function getUserId() { return $this->userId; }

    public function setSSN($ssn) { $this->ssn = $ssn; }
    public function setFName($fName) { $this->fName = $fName; }
    public function setMInitial($mInitial) { $this->mInitial = $mInitial; }
    public function setLName($lName) { $this->lName = $lName; }
    public function setSex($sex) { $this->sex = $sex; }
    public function setEnrollmentDate($enrollmentDate) { $this->enrollmentDate = $enrollmentDate; }
    public function setBuildingNum($buildingNum) { $this->buildingNum = $buildingNum; }
    public function setStreet($street) { $this->street = $street; }
    public function setAptNum($aptNum) { $this->aptNum = $aptNum; }
    public function setCity($city) { $this->city = $city; }
    public function setAState($aState) { $this->aState = $aState; }
    public function setZip($zip) { $this->zip = $zip; }
    public function setUserId($userId) { $this->userId = $userId; }

    // Database operations
    public static function getById($ssn)
    {
        $db = new Database();
        $sql = "SELECT * FROM Person WHERE SSN = ?";
        $result = $db->query($sql, [$ssn]);
        
        if ($result && is_array($result) && count($result) > 0) {
            return self::mapRowToPerson($result[0]);
        }
        
        return null;
    }

    public static function getAll()
    {
        $db = new Database();
        $sql = "SELECT * FROM Person";
        $result = $db->query($sql);
        
        $people = [];
        if ($result) {
            foreach ($result as $row) {
                $people[] = self::mapRowToPerson($row);
            }
        }
        
        return $people;
    }

    public function save()
    {
        $db = new Database();
        if ($this->getById($this->ssn)) {
            // Update existing record
            $sql = "UPDATE Person SET F_Name = ?, M_Initial = ?, L_Name = ?, Sex = ?, 
                    Enrollment_Date = ?, Building_num = ?, Street = ?, Apt_num = ?, 
                    City = ?, AState = ?, Zip = ?, UserID = ? WHERE SSN = ?";
            
            return $db->query($sql, [
                $this->fName, $this->mInitial, $this->lName, $this->sex,
                $this->enrollmentDate, $this->buildingNum, $this->street, $this->aptNum,
                $this->city, $this->aState, $this->zip, $this->userId, $this->ssn
            ]);
        } else {
            // Insert new record
            $sql = "INSERT INTO Person (SSN, F_Name, M_Initial, L_Name, Sex, Enrollment_Date, 
                    Building_num, Street, Apt_num, City, AState, Zip, UserID) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            return $db->query($sql, [
                $this->ssn, $this->fName, $this->mInitial, $this->lName, $this->sex,
                $this->enrollmentDate, $this->buildingNum, $this->street, $this->aptNum,
                $this->city, $this->aState, $this->zip, $this->userId
            ]);
        }
    }

    public function delete()
    {
        $db = new Database();
        $sql = "DELETE FROM Person WHERE SSN = ?";
        return $db->query($sql, [$this->ssn]);
    }

    private static function mapRowToPerson($row)
    {
        return new Person(
            $row['SSN'] ?? null,
            $row['F_Name'] ?? null,
            $row['M_Initial'] ?? null,
            $row['L_Name'] ?? null,
            $row['Sex'] ?? null,
            $row['Enrollment_Date'] ?? null,
            $row['Building_num'] ?? null,
            $row['Street'] ?? null,
            $row['Apt_num'] ?? null,
            $row['City'] ?? null,
            $row['AState'] ?? null,
            $row['Zip'] ?? null,
            $row['UserID'] ?? null
        );
    }
}