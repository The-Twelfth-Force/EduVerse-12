'use client';

import { CourseDash } from "@/components/CourseDash";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CourseDetails {
    _id: string;
    course_name: string;
    description: string;
    // Add other properties as needed
}
const dummyCourses: CourseDetails[] = [
    {
        _id: '1',
        course_name: 'Course 1',
        description: 'Description for Course 1',
    },
    {
        _id: '2',
        course_name: 'Course 2',
        description: 'Description for Course 2',
    },
];
// Add more dummy courses as needed

export default function CoursePage() {
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);

    useEffect(() => {
        // Fetch course details based on courseId
        const fetchCourseDetails = async () => {
        try {
            // Simulate fetching course details
            const currentCourse = dummyCourses.find((course) => course._id === courseId);
            setCourseDetails(currentCourse || null);
        } catch (error) {
            console.error("Error fetching course details:", error);
        }
        };
    
        fetchCourseDetails();
    }, [courseId]);
    
    if (!courseDetails) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="min-h-screen w-full p-4 space-y-6">
            <CourseDash courseId={courseId as string} />
        </div>
    );
}