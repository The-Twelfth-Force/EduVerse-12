import React from 'react';
import Head from 'next/head';

export default function Grades() {
  // Dummy data to simulate grade information
  const dummyGrades = [
    { id: 1, course: 'CS-4347', title: 'Database Systems', grade: 'A', credits: 3 },
    { id: 2, course: 'CS-4390', title: 'Computer Networks', grade: 'B+', credits: 3 },
    { id: 3, course: 'CS-4337', title: 'Data Structures', grade: 'A-', credits: 3 },
    { id: 4, course: 'CS-3354', title: 'Software Engineering', grade: 'B', credits: 4 },
    // Add more dummy data as needed
  ];

  return (
    <div className="min-h-screen p-12 bg-gray-50">
      <Head>
        <title>Grades - EduVerse-12</title>
      </Head>
      <h1 className="text-3xl font-semibold text-gray-800">Grades</h1>
      <hr className="mt-2 border-t-2 border-gray-300" />
      <div className="mt-6">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Course
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Grade
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Credits
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyGrades.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="py-3 px-6 text-sm text-gray-800">
                  {item.course}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {item.title}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {item.grade}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {item.credits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
