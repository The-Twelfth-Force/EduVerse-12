'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
    const course = testCourseInfo.find(course => course._id === courseId);
    if (!course) {
        return <div className="text-red-500 p-4">Course not found</div>;
    }

    return (
        <div className="w-full mx-auto mt-8 px-4 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold">{course.course_name}</h2>
                    <p className="text-gray-500">{course.prefix} {course.number} – Section {course.section_number}</p>
                </div>
            </div>

            <Tabs defaultValue="info" className="w-full">
                <TabsList className="w-full bg-gray-900 border-b mb-6 space-x-20 text-white">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="announcements">Announcements</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                    <div className="space-y-4 text-sm text-gray-700">
                        <div className="border border-gray-200 rounded-md shadow bg-white p-4">
                            <p>{course.description}</p>
                        </div>

                        <div className="border border-gray-200 rounded-md shadow bg-white p-4">
                            <h4 className="font-semibold mb-1 text-gray-800">Instructor</h4>
                            <p>{course.profFirst} {course.profLast}</p>
                        </div>

                        <div className="border border-gray-200 rounded-md shadow bg-white p-4">
                            <h4 className="font-semibold mb-2 text-gray-800">Meeting Times</h4>
                            {course.meetings.map((meeting, index) => (
                                <div key={index} className="pl-3 border-l border-gray-300 space-y-1 mb-2">
                                    <p>{meeting.meeting_days.join(", ")}</p>
                                    <p>{meeting.start_time} – {meeting.end_time}</p>
                                    <p>{meeting.location.building} {meeting.location.room}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="assignments">
                    <div className="flex flex-col space-y-4 text-sm text-gray-700 text-start">
                        {course.assignments.map((assignment, index) => (
                            <Sheet key={index}>
                                <SheetTrigger className="p-4 text-start rounded-md border border-gray-200 bg-white shadow hover:bg-gray-50 transition">
                                    <p className="font-semibold text-gray-900">{assignment.title}</p>
                                    <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                                    <p className="mt-1">{assignment.description}</p>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Assignment Details</SheetTitle>
                                        <SheetDescription>
                                            Here you can find more details about the assignment.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fileTitle">
                                                File Title
                                            </label>
                                            <Input
                                                type="text"
                                                id="fileTitle"
                                                name="fileTitle"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                                placeholder="Enter file title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fileUpload">
                                                Upload File
                                            </label>
                                            <Input
                                                type="file"
                                                id="fileUpload"
                                                name="fileUpload"
                                                className="w-full"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full text-white py-2 rounded-md hover:bg-gray-700 transition"
                                        >
                                            Upload
                                        </Button>
                                    </form>
                                </SheetContent>
                            </Sheet>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="announcements">
                    <div className="space-y-4 text-sm text-muted-foreground">
                        {course.announcements.map((announcement, index) => (
                            <div key={index} className="p-4 rounded-md border bg-muted space-y-1">
                                <p className="text-foreground font-medium">{announcement.title}</p>
                                <p className="text-xs text-gray-500">{announcement.date}</p>
                                <p>{announcement.content}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="resources">
                    <div className="space-y-3 text-sm text-gray-700">
                        {course.resources.map((resource, index) => (
                            <div key={index} className="flex justify-between items-center p-4 rounded-md border border-gray-200 bg-white shadow hover:bg-gray-50 transition">
                                <p className="font-medium text-gray-800">{resource.title}</p>
                                <a
                                    href={resource.link}
                                    className="text-sm text-blue-600 underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View
                                </a>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="grades">
                    <div className="space-y-4 text-sm text-gray-700">
                        {course.grades.map((grade, index) => (
                            <div key={index} className="p-3 rounded-md border bg-green-50 shadow-sm flex justify-between items-center">
                                <p className="font-medium">{grade.assignment}</p>
                                <p className="text-green-800 font-semibold">{grade.score} / {grade.total}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}