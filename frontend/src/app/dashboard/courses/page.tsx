import React from 'react';
import Head from 'next/head';

export default function Courses() {
  return (
    <div className="min-h-screen p-12 bg-gray-50">
      <Head>
        <title>Courses - EduVerse-12</title>
      </Head>
      <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
      <hr className="mt-2 border-t-2 border-gray-300" />
      {/* Add additional Courses content here */}
    </div>
  );
}
