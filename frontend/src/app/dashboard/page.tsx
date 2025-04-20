"use client";

import React, { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

const dummyCourses = [
  {
    id: 1,
    code: 'CS-4347.001',
    name: 'Database Systems',
    term: 'S25',
    status: 'Open',
    instructor: 'Jane Doe',
    imageUrl: '/images/landscape.jpg',
  },
  {
    id: 2,
    code: 'CS-4390.002',
    name: 'Computer Networks',
    term: 'S25',
    status: 'Closed',
    instructor: 'John Smith',
    imageUrl: '/images/landscape.jpg',
  },
  {
    id: 3,
    code: 'CS-4337.003',
    name: 'Data Structures',
    term: 'S25',
    status: 'Open',
    instructor: 'Alice Johnson',
    imageUrl: '/images/landscape.jpg',
  },
  {
    id: 4,
    code: 'CS-3354.004',
    name: 'Software Engineering',
    term: 'S25',
    status: 'Open',
    instructor: 'Bob Williams',
    imageUrl: '/images/landscape.jpg',
  },
  {
    id: 5,
    code: 'CS-4349.005',
    name: 'Computer Architecture',
    term: 'S25',
    status: 'Closed',
    instructor: 'Emily Brown',
    imageUrl: '/images/landscape.jpg',
  },
  {
    id: 6,
    code: 'CS-4315.006',
    name: 'Compiler Design',
    term: 'S25',
    status: 'Open',
    instructor: 'David Taylor',
    imageUrl: '/images/landscape.jpg',
  },
];

export type Course = typeof dummyCourses[0];


export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('2025 Spring - Regular');
  const [selectedFilter, setSelectedFilter] = useState('All courses');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Modified toggleFavorite to persist in state properly
  const toggleFavorite = (courseId: number) => {
    setFavorites(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Updated filteredCourses to include favorite filtering
  const filteredCourses = dummyCourses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'All courses' || 
      (selectedFilter === 'Favorites' && favorites.includes(course.id));

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

  const CourseCard = ({ course }: { course: typeof dummyCourses[0] }) => (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40">
        <img
          src={course.imageUrl}
          alt={`Course ${course.code}`}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => toggleFavorite(course.id)}
          className="absolute top-2 right-2 p-2 text-yellow-400  rounded-full hover:bg-teal-200 hover:text-gray-900"
        >
          {favorites.includes(course.id) ? (
            <FaStar className="w-5 h-5" />
          ) : (
            <FaRegStar className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {course.code} - {course.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium text-gray-600">{course.term}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                course.status === 'Open' 
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
            Instructor: <span className="font-medium">{course.instructor}</span>
          </p>
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
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}