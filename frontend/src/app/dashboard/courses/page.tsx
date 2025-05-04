"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { CourseSection } from '@/types/course';

const dummyCourses: CourseSection[] = [
  {
    _id: 1,
    prefix: 'CS',
    number: '101',
    section_number: 1,
    course_name: 'Introduction to Computer Science',
    term: 'S25',
    status: 'Open',
    profFirst: 'John',
    profLast: 'Doe',
    meetings: [
      {
        meeting_days: ['Monday', 'Wednesday'],
        start_time: '10:00 AM',
        end_time: '11:30 AM',
        location: {
          building: 'Engineering Building',
          room: '101',
        },
      },
    ],
    imageUrl: '/images/landscape.jpg',
  },
  {
    _id: 2,
    prefix: 'CS',
    number: '102',
    section_number: 2,
    course_name: 'Data Structures',
    term: 'S25',
    status: 'Open',
    profFirst: 'Jane',
    profLast: 'Smith',
    meetings: [
      {
        meeting_days: ['Tuesday', 'Thursday'],
        start_time: '1:00 PM',
        end_time: '2:30 PM',
        location: {
          building: 'Science Building',
          room: '202',
        },
      },
    ],
    imageUrl: '/images/landscape.jpg',
  }
];

export default function Dashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('2025 Spring - Regular');
  const [selectedFilter, setSelectedFilter] = useState('All courses');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (courseId: string) => {
    setFavorites(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const filteredCourses = dummyCourses.filter((course) => {
    const matchesSearch = course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.number.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'All courses' ||
      (selectedFilter === 'Favorites' && favorites.includes(String(course._id)));

    return matchesSearch && matchesFilter;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handleCardClick = (courseId: string) => {
    router.push(`/dashboard/courses/${courseId}/`);
  };

  const CourseCard = ({ course }: { course: typeof dummyCourses[0] }) => (
    <div
      className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => handleCardClick(String(course._id))}
    >
      <div>
        <div className="relative h-40">
          <Image
            src={course.imageUrl}
            alt={`Course ${course.number}`}
            width={400}
            height={160}
            className="w-full h-full object-cover"
          />
          <button
            onClick={e => {
              e.stopPropagation();
              toggleFavorite(String(course._id));
            }}
            className="absolute top-2 right-2 p-2 text-yellow-400 rounded-full hover:bg-teal-200 hover:text-gray-900"
          >
            {favorites.includes(String(course._id)) ? (
              <FaStar className="w-5 h-5" />
            ) : (
              <FaRegStar className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="p-4 ">
          <div className="flex items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {course.prefix + course.number} - {course.course_name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-gray-600">{course.term}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${course.status === 'Open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {course.status}
                </span>
              </div>
            </div>
          </div>
          <div className="border-t pt-2">
            <p className="text-sm text-gray-600">
              Instructor: <span className="font-medium">{course.profFirst + " " + course.profLast}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-12 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      <hr className="mt-2 mb-6 border-t-2 border-gray-300" />
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <label htmlFor="search" className="mr-2 text-gray-700">
            Search:
          </label>
          <input
            id="search"
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
            placeholder="Search courses"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex items-center mb-4 md:mb-0">
          <label htmlFor="termSelect" className="mr-2 text-gray-700">
            Terms:
          </label>
          <select
            id="termSelect"
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedTerm}
            onChange={handleTermChange}
          >
            <option>2025 Spring - Regular</option>
            <option>2025 Fall - Regular</option>
            <option>2024 Fall - Regular</option>
            <option>2024 Spring - Regular</option>
          </select>
        </div>

        <div className="flex items-center mb-4 md:mb-0">
          <label htmlFor="filterSelect" className="mr-2 text-gray-700">
            Filters:
          </label>
          <select
            id="filterSelect"
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option>All courses</option>
            <option>Enrolled</option>
            <option>Favorites</option>
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2 text-gray-700">
            Items per page
          </label>
          <select
            id="itemsPerPage"
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="mb-4 text-gray-700">
        {filteredCourses.length} results · {selectedTerm} · {selectedFilter}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.slice(0, itemsPerPage).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}