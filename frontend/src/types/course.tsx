export type Course = {
    _id: string;
    prefix: string;
    number: string;
    profFirst: string;
    profLast: string;
    section_number: string;
};

export type CourseSection = {
    _id: number;
    prefix: string;
    number: string;
    section_number: number;
    course_name: string;
    term: string;
    status: string;
    profFirst: string;
    profLast: string;
    meetings: {
        meeting_days: string[];
        start_time: string;
        end_time: string;
        location: {
            building: string;
            room: string;
        };
    }[];
    imageUrl: string;
};
