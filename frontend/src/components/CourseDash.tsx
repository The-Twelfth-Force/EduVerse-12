'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

interface CourseDashProps {
    courseId: string;
}

const testCourseInfo = [
    {
        _id: "1",
        prefix: "CS",
        number: "101",
        section_number: "001",
        course_name: "Introduction to Computer Science",
        term: "S25",
        status: "Open",
        profFirst: "John",
        profLast: "Doe",
        meetings: [
            {
                meeting_days: ["Monday", "Wednesday"],
                start_time: "10:00 AM",
                end_time: "11:30 AM",
                location: {
                    building: "Engineering Building",
                    room: "101",
                },
            },
        ],
        imageUrl: "/images/landscape.jpg",
        description: "This course provides an introduction to computer science concepts and programming.",
        assignments: [
            {
                title: "Assignment 1",
                dueDate: "2023-10-01",
                description: "Introduction to programming concepts.",
                status: "Completed",
            },
            {
                title: "Assignment 2",
                dueDate: "2023-10-15",
                description: "Data structures and algorithms.",
                status: "In Progress",
            },
        ],
        announcements: [
            {
                title: "Welcome to the Course!",
                date: "2023-09-01",
                content: "Hello everyone! Welcome to CS 101. I'm excited to have you all in this course.",
            },
            {
                title: "Midterm Exam Schedule",
                date: "2023-10-10",
                content: "The midterm exam will be held on October 20th. Please check the syllabus for details.",
            },
        ],
        resources: [
            {
                title: "Course Syllabus",
                link: "/syllabus.pdf",
            },
            {
                title: "Lecture Slides",
                link: "/slides/lecture1.pdf",
            },
        ],
        grades: [
            {
                assignment: "Assignment 1",
                score: 95,
                total: 100,
            },
            {
                assignment: "Assignment 2",
                score: 85,
                total: 100,
            },
        ],
    },
    {
        _id: "2",
        prefix: "CS",
        number: "102",
        section_number: "002",
        course_name: "Data Structures",
        term: "S25",
        status: "Open",
        profFirst: "Jane",
        profLast: "Smith",
        meetings: [
            {
                meeting_days: ["Tuesday", "Thursday"],
                start_time: "1:00 PM",
                end_time: "2:30 PM",
                location: {
                    building: "Science Building",
                    room: "202",
                },
            },
        ],
        imageUrl: "/images/landscape.jpg",
        description: "This course covers data structures and algorithms in depth.",
        assignments: [
            {
                title: "Assignment 1",
                dueDate: "2023-10-05",
                description: "Implementing basic data structures.",
                status: "Not Started",
            },
            {
                title: "Assignment 2",
                dueDate: "2023-10-20",
                description: "Advanced data structures and algorithms.",
                status: "Not Started",
            },
        ],
        announcements: [
            {
                title: "Course Materials",
                date: "2023-09-05",
                content: "All course materials are available on the course website.",
            },
            {
                title: "Office Hours",
                date: "2023-09-15",
                content: "Office hours will be held on Mondays from 3 PM to 5 PM.",
            },
        ],
        resources: [
            {
                title: "Textbook",
                link: "/textbook.pdf",
            },
            {
                title: "Lecture Notes",
                link: "/notes/lecture1.pdf",
            },
        ],
        grades: [
            {
                assignment: "Assignment 1",
                score: 90,
                total: 100,
            },
            {
                assignment: "Assignment 2",
                score: 80,
                total: 100,
            },
        ],
    }
];



export function CourseDash({ courseId }: CourseDashProps) {
    // Find the course with the given courseId
    const course = testCourseInfo.find(course => course._id === courseId);
    if (!course) {
        return <div className="text-red-500">Course not found</div>;
    }

    return (
        <div className="w-full mx-auto mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">{course.course_name}</h2>
            </div>
            <Tabs defaultValue="info" className="w-full">
                <TabsList className="border-b-2">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="announcements">Announcements</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Course Information</h3>
                        <p>{course.description}</p>
                        <h4 className="mt-4 text-md font-semibold">Instructor:</h4>
                        <p>{course.profFirst} {course.profLast}</p>
                        <h4 className="mt-4 text-md font-semibold">Meeting Times:</h4>
                        {course.meetings.map((meeting, index) => (
                            <div key={index}>
                                <p>{meeting.meeting_days.join(", ")}</p>
                                <p>{meeting.start_time} - {meeting.end_time}</p>
                                <p>{meeting.location.building} {meeting.location.room}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="assignments">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Course Information</h3>
                        <p>{course.description}</p>
                        <h4 className="mt-4 text-md font-semibold">Instructor:</h4>
                        <p>{course.profFirst} {course.profLast}</p>
                        <h4 className="mt-4 text-md font-semibold">Meeting Times:</h4>
                        {course.meetings.map((meeting, index) => (
                            <div key={index}>
                                <p>{meeting.meeting_days.join(", ")}</p>
                                <p>{meeting.start_time} - {meeting.end_time}</p>
                                <p>{meeting.location.building} {meeting.location.room}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="announcements">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Course Information</h3>
                        <p>{course.description}</p>
                        <h4 className="mt-4 text-md font-semibold">Instructor:</h4>
                        <p>{course.profFirst} {course.profLast}</p>
                        <h4 className="mt-4 text-md font-semibold">Meeting Times:</h4>
                        {course.meetings.map((meeting, index) => (
                            <div key={index}>
                                <p>{meeting.meeting_days.join(", ")}</p>
                                <p>{meeting.start_time} - {meeting.end_time}</p>
                                <p>{meeting.location.building} {meeting.location.room}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="resources">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Course Information</h3>
                        <p>{course.description}</p>
                        <h4 className="mt-4 text-md font-semibold">Instructor:</h4>
                        <p>{course.profFirst} {course.profLast}</p>
                        <h4 className="mt-4 text-md font-semibold">Meeting Times:</h4>
                        {course.meetings.map((meeting, index) => (
                            <div key={index}>
                                <p>{meeting.meeting_days.join(", ")}</p>
                                <p>{meeting.start_time} - {meeting.end_time}</p>
                                <p>{meeting.location.building} {meeting.location.room}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="grades">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Course Information</h3>
                        <p>{course.description}</p>
                        <h4 className="mt-4 text-md font-semibold">Instructor:</h4>
                        <p>{course.profFirst} {course.profLast}</p>
                        <h4 className="mt-4 text-md font-semibold">Meeting Times:</h4>
                        {course.meetings.map((meeting, index) => (
                            <div key={index}>
                                <p>{meeting.meeting_days.join(", ")}</p>
                                <p>{meeting.start_time} - {meeting.end_time}</p>
                                <p>{meeting.location.building} {meeting.location.room}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}