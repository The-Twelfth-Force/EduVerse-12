-- Disable foreign key checks to prevent issues during data import
SET FOREIGN_KEY_CHECKS = 0;

-- Load data into the User table
LOAD DATA LOCAL INFILE 'path/user.csv'
INTO TABLE User
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(UserID, School_Email, Password, Date_Created);

-- Load data into the Person table
LOAD DATA LOCAL INFILE 'path/person.csv'
INTO TABLE Person
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(SSN, F_Name, M_Initial, L_Name, Sex, Enrollment_Date, Building_num, Street, Apt_num, City, AState, Zip, UserID);

-- Load data into the Student table
LOAD DATA LOCAL INFILE 'path/student.csv'
INTO TABLE Student
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(StudentSSN, Status);

-- Load data into the Professor table
LOAD DATA LOCAL INFILE 'path/professor.csv'
INTO TABLE Professor
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(ProfessorSSN, PPhone, Salary, Office_Location, Office_Hours, Department);

-- Load data into the Department table
LOAD DATA LOCAL INFILE 'path/department.csv'
INTO TABLE Department
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(Dname, Dphone, Dlocation);

-- Load data into the Course table
LOAD DATA LOCAL INFILE 'path/course.csv'
INTO TABLE Course
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(CourseID, C_Name, C_Info, C_Location, C_Capacity, C_Date, Department, ProfessorSSN);

-- Load data into the Transcript table
LOAD DATA LOCAL INFILE 'path/transcript.csv'
INTO TABLE Transcript
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(StudentSSN, CourseID, GPA);

-- Re-enable foreign key checks after data import
SET FOREIGN_KEY_CHECKS = 1;
