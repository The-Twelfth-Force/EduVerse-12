'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const Router = useRouter();
  const { isLoaded, user, isSignedIn } = useUser();
  const userType = user?.publicMetadata.userType;

  // Local state to control the fade-in animation for the illustration
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // Trigger the image to appear after component mounts
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 300); // 300ms delay to start the fade-in
    return () => clearTimeout(timer);
  }, []);

  // Loading State
  if (!isLoaded) {
    return (
<div className="min-h-screen w-full bg-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  // Not signed in (Landing Page)
  if (!isSignedIn) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-r from-[#d1f4f9] via-[#e1e9ff] to-[#f0e4ff] flex flex-col items-center justify-start pt-24 px-4">
        {/* Fading in the illustration */}
        <div
          className={`${
            showImage ? 'animate-fadeInDown' : 'opacity-0'
          } w-full max-w-md flex justify-center mb-6`}
        >
          <Image
            src="/images/landing_image.png"
            alt="Modern eLearning illustration"
            width={500}
            height={400}
            className="rounded-lg" // Removed shadow for seamless blend
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome to EduVerse-12</h1>
        <p className="mt-2 text-lg text-gray-700">Your gateway to modern e-learning.</p>
        <div className="mt-6">
          <Button onClick={() => Router.push('/sign-in')}>
            Sign in
          </Button>
        </div>

        {/* Inline global styles for fade-in-down animation */}
        <style jsx global>{`
          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInDown {
            animation: fadeInDown 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  // Signed in
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-[#d1f4f9] via-[#e1e9ff] to-[#f0e4ff]">
      <h1 className="text-3xl font-bold text-gray-800">EduVerse-12</h1>
      <div className="flex flex-row items-center justify-center space-x-3 mt-4">
        <p className="text-lg text-gray-700">Welcome, {user?.firstName}!</p>
        <UserButton />
      </div>
      <p className="mt-4 text-gray-700">Go to:</p>
      <div className="flex items-center justify-center space-x-4 mt-2">
        <Button onClick={() => Router.push('/registration')}>Registration</Button>
        <Button
          onClick={() =>
            userType === 'stu'
              ? Router.push('/dashboard/student')
              : Router.push('/dashboard/instructor')
          }
        >
          Dashboard →
        </Button>
      </div>
    </div>
  );
}
