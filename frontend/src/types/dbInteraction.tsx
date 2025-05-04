export type SearchFilter = {
    subject: string;
    course: string;
    section: string;
    professor: string;
}

export const FilterOptions = {
    subject: [
        { value: 'All', label: 'All' },
        { value: 'CS', label: 'CS' },
        { value: 'MATH', label: 'MATH' },
        { value: 'ENG', label: 'ENG' },
    ],
    course: [
        { value: 'All', label: 'All' },
        { value: '1111', label: '1111' },
        { value: '102', label: '102' },
        { value: '201', label: '201' },
    ],
    section: [
        { value: 'All', label: 'All' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
    ],
    professor: [
        { value: 'John Doe', label: 'John Doe' },
        { value: 'Jane Smith', label: 'Jane Smith' },
        { value: 'Grace Martinez', label: 'Grace Martinez' },
    ],
};