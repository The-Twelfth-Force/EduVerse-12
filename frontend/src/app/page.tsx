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
  const userName = user?.firstName;

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

   // Signed-in layout
   return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#d1f4f9] via-[#e1e9ff] to-[#f0e4ff] flex flex-col">
      {/* Top-left "logo"-style title */}
      <header className="p-4">
      <h1 className="text-2xl font-bold italic text-gray-800 uppercase tracking-wider pl-10">
      EduVerse-12
        </h1>
      </header>

      {/* Main Profile Section: raised up */}
      <main className="flex flex-col items-center justify-start mt-20">
        {/* Large circular UserButton */}
        <div className="rounded-full w-36 h-36 bg-gradient-to-r from-[#d28efc] to-[#9ed8fe] shadow-xl backdrop-blur-sm flex items-center justify-center">
        <UserButton
          appearance={{
            elements: {
              // Adjust these or check Clerk docs for the exact sub-elements you can override
              userButtonAvatarBox: "w-32 h-32",
              userButtonTrigger: "w-32 h-32",
            },
          }}
        />
        </div>

        <p className="mt-4 text-xl leading-tight tracking-wide text-gray-900">
          <span className="font-normal">Welcome back, </span>
          <span className="font-bold">{userName}</span>
        </p>

        {/* Two big "glass effect" boxes */}
        <div className="mt-20 w-full max-w-6xl px-6 flex flex-row items-center justify-evenly">
          {/* Registration Box */}
          <div
            className="group relative w-2/5 max-w-sm bg-white/30 backdrop-blur-md shadow-lg p-6 rounded-xl flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => Router.push('/registration/semester')}
          >
            <Image
              src="/images/register.png"
              alt="Registration"
              width={700}
              height={500}
              className="rounded-md"
            />
            <span className="mt-4 text-2xl font-semibold text-gray-800">
              Registration
            </span>
          </div>

          {/* Dashboard Box */}
          <div
            className="group relative w-2/5 max-w-sm bg-white/30 backdrop-blur-md shadow-lg p-6 rounded-xl flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() =>
              userType === 'stu'
                ? Router.push('/dashboard/student')
                //I placed the dahsboard as the navigation push for the dashboard tab.
                : Router.push('/dashboard')
            }
          >
            <Image
              src="/images/dashboard.png"
              alt="Dashboard"
              width={400}
              height={300}
              className="rounded-md"
            />
            <span className="mt-4 text-2xl font-semibold text-gray-800">
              Dashboard
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}