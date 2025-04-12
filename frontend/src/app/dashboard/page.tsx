import React from 'react';
import Head from 'next/head';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-12 bg-gray-50">
      <Head>
        <title>Dashboard - EduVerse-12</title>
      </Head>
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <hr className="mt-2 border-t-2 border-gray-300" />
      {/* Add additional Dashboard content here */}
    </div>
  );
}
