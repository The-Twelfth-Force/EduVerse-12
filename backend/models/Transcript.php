<?php
/*
CREATE TABLE Transcript (
    StudentSSN CHAR(9) NOT NULL,
    CourseID INT NOT NULL,
    GPA DECIMAL(3,2) NOT NULL,
    PRIMARY KEY (StudentSSN, CourseID),
    FOREIGN KEY (StudentSSN) REFERENCES Student(StudentSSN),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
);
*/