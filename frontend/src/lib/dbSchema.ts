import { RowDataPacket } from "mysql2/promise";

export interface User extends RowDataPacket {
    UserID: number;
    School_Email: string;
    Password: string;
    Date_Created: Date;
}

export interface Person extends RowDataPacket {
    SSN: number;
    F_Name: string;
    M_Initial: string;
    L_Name: string;
    Sex: string;
    Enrollment_Date: string;
    Building_Number: number;
    Street: string;
    Apt_Number: number;
    City: string;
    State: string;
    Zip: number;
    UserID: number;
}

export interface Student extends RowDataPacket {
    SSN: number;
    Status: string;
}

export interface Professor extends RowDataPacket {
    SSN: number;
    PPhone: string;
    Salary: number;
    Office_Location: string;
    Office_Hours: string;
    Department: string;
}

export interface Course extends RowDataPacket {
    Course_ID: string;
    C_Name: string;
    Department: string;
}

export interface Section extends RowDataPacket {
    SectionID: number;
    SectionNum: number;
    Course_ID: string;
    Subject: string;
    Location: string;
    S_Info: string;
    S_Capacity: number;
    Date: string;
    ProfessorSSN: number;
}

export interface Department extends RowDataPacket {
    Dname: string;
    Dphone: string;
    Doffice: string;
}

