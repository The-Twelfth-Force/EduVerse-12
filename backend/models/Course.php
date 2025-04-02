<?php
/*
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
*/