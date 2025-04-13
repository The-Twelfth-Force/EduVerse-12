import React from 'react';
import Head from 'next/head';

export default function Inbox() {
  return (
    <div className="min-h-screen p-12 bg-gray-50">
      <Head>
        <title>Inbox - EduVerse-12</title>
      </Head>
      <h1 className="text-4xl font-semibold text-gray-800">Inbox</h1>
      <hr className="mt-2 border-t-2 border-gray-300" />
      {/* Add additional Inbox content here */}
    </div>
  );
}
