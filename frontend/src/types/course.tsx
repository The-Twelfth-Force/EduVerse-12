export type Course = {
    _id: string;
    prefix: string;
    number: string;
    profFirst: string;
    profLast: string;
    section_number: string;
}

export type CourseSection = {
    _id: string;
    prefix: string;
    number: string;
    section_number: string;
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
};