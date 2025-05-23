-- create.sql (Updated with ON UPDATE constraints)
-- EduVerse 12: SQL Schema for CS 4347 Project - Phase 3 Task C

CREATE TABLE User (
  UserID INT PRIMARY KEY NOT NULL,
  School_Email VARCHAR(50) UNIQUE NOT NULL,
  Password VARCHAR(20) NOT NULL,
  Date_Created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Person (
  SSN CHAR(9) PRIMARY KEY NOT NULL,
  F_Name VARCHAR(50) NOT NULL,
  M_Initial CHAR(1),
  L_Name VARCHAR(50) NOT NULL,
  Sex CHAR(1) NOT NULL,
  Enrollment_Date DATE,
  Building_# VARCHAR(10),
  Street VARCHAR(50),
  Apt_# VARCHAR(10),
  City VARCHAR(50),
  State CHAR(2),
  Zip VARCHAR(10),
  UserID INT,
  FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Department (
  Dname VARCHAR(50) PRIMARY KEY NOT NULL,
  Dphone VARCHAR(10),
  Doffice VARCHAR(50)
);

CREATE TABLE Professor (
  ProfessorSSN CHAR(9) PRIMARY KEY NOT NULL,
  PPhone VARCHAR(10),
  Salary DECIMAL(10,2) NOT NULL,
  Office_Location VARCHAR(50),
  Office_Hrs TEXT,
  Department VARCHAR(50) NOT NULL,
  FOREIGN KEY (ProfessorSSN) REFERENCES Person(SSN) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Department) REFERENCES Department(Dname) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Student (
  SSN CHAR(9) PRIMARY KEY NOT NULL,
  Status VARCHAR(20) NOT NULL,
  FOREIGN KEY (SSN) REFERENCES Person(SSN) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Major (
  StudentSSN CHAR(9) NOT NULL,
  Department VARCHAR(50) NOT NULL,
  PRIMARY KEY (StudentSSN, Department),
  FOREIGN KEY (StudentSSN) REFERENCES Student(SSN) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Department) REFERENCES Department(Dname) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Minor (
  StudentSSN CHAR(9) NOT NULL,
  Department VARCHAR(50) NOT NULL,
  PRIMARY KEY (StudentSSN, Department),
  FOREIGN KEY (StudentSSN) REFERENCES Student(SSN) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Department) REFERENCES Department(Dname) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Course (
  Course_ID VARCHAR(10) PRIMARY KEY NOT NULL,
  C_Name VARCHAR(100) NOT NULL,
  Location VARCHAR(50),
  C_Info TEXT,
  C_Capacity INT NOT NULL DEFAULT 0,
  Date DATE NOT NULL,
  Department VARCHAR(50) NOT NULL,
  ProfessorSSN CHAR(9),
  FOREIGN KEY (Department) REFERENCES Department(Dname) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (ProfessorSSN) REFERENCES Professor(ProfessorSSN) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Registered (
  StudentSSN CHAR(9) NOT NULL,
  Current_Course VARCHAR(10) NOT NULL,
  PRIMARY KEY (StudentSSN, Current_Course),
  FOREIGN KEY (StudentSSN) REFERENCES Student(SSN) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Current_Course) REFERENCES Course(Course_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Transcript (
  StudentSSN CHAR(9) NOT NULL,
  Course_ID VARCHAR(10) NOT NULL,
  GPA DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  PRIMARY KEY (StudentSSN, Course_ID),
  FOREIGN KEY (StudentSSN) REFERENCES Student(SSN) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Content (
  Assignment_ID INT PRIMARY KEY NOT NULL,
  Category VARCHAR(50) NOT NULL,
  Course_ID VARCHAR(10) NOT NULL,
  FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID) ON DELETE CASCADE ON UPDATE CASCADE
);
