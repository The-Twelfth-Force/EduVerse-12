import React from 'react';
import Head from 'next/head';

export default function Help() {
  return (
    <div className="min-h-screen p-12 bg-gray-50">
      <Head>
        <title>Help - EduVerse-12</title>
      </Head>
      <h1 className="text-3xl font-bold text-gray-800">Help</h1>
      <hr className="mt-2 border-t-2 border-gray-300" />
      {/* Add additional Help content here */}
    </div>
  );
}
