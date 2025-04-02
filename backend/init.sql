CREATE DATABASE learningDB;

use learningDB;

CREATE TABLE User (
    UserID INT AUTO_INCREMENT NOT NULL,
    School_Email VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Date_Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID)
);

CREATE TABLE Person (
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
);

CREATE TABLE Student (
    StudentSSN CHAR(9) NOT NULL,
    Status CHAR(1) NOT NULL,
    PRIMARY KEY (StudentSSN),
    FOREIGN KEY (StudentSSN) REFERENCES Person(SSN)
);

CREATE TABLE Professor (
    ProfessorSSN CHAR(9) NOT NULL,
    PPhone CHAR(10) NULL,
    Salary DECIMAL(10,2) NULL,
    Office_Location VARCHAR(10) NULL,
    Office_Hours VARCHAR(50) NULL,
    Department VARCHAR(50) NULL,
    PRIMARY KEY (ProfessorSSN),
    FOREIGN KEY (ProfessorSSN) REFERENCES Person(SSN)
);

CREATE TABLE Department (
    Dname VARCHAR(50) NOT NULL,
    Dphone CHAR(10) NULL,
    Dlocation VARCHAR(50) NULL,
    PRIMARY KEY (Dname)
);

CREATE TABLE Course (
    CourseID INT NOT NULL,
    C_Name VARCHAR(50) NOT NULL,
    C_Info JSON NOT NULL,
    C_Location VARCHAR(50) NOT NULL,
    C_Capacity INT NOT NULL,
    C_Date DATETIME NOT NULL,
    Department VARCHAR(50) NOT NULL,
    ProfessorSSN CHAR(9) NOT NULL,
    PRIMARY KEY (CourseID),
    FOREIGN KEY (Department) REFERENCES Department(Dname),
    FOREIGN KEY (ProfessorSSN) REFERENCES Professor(ProfessorSSN)
);

CREATE TABLE Transcript (
    StudentSSN CHAR(9) NOT NULL,
    CourseID INT NOT NULL,
    GPA DECIMAL(3,2) NOT NULL,
    PRIMARY KEY (StudentSSN, CourseID),
    FOREIGN KEY (StudentSSN) REFERENCES Student(StudentSSN),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
);
