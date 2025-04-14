'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Inbox,
  Clock,
  HelpCircle,
  ArrowLeftCircle,
  ClipboardList,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const userName = user?.firstName || 'Guest';

  // This helper function returns the appropriate classes for a nav button.
  const getButtonClasses = (targetPath: string) => {
    const isActive = pathname === targetPath;
    return `w-full flex flex-col items-center p-2 rounded transition-colors ${isActive ? "bg-teal-200 text-gray-900" : "hover:bg-teal-200 hover:text-gray-900"}`;
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-22 bg-gray-900 text-white flex flex-col items-center">
        {/* Profile Section (clickable nav element linking to profile) */}
        <button
          //onClick={() => router.push('/dashboard/account')}
          className="pt-8 pb-4 flex flex-col items-center focus:outline-none"
        >
          <div className="rounded-full bg-white p-2 w-9 h-9 flex items-center justify-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                  userButtonTrigger: "w-8 h-8",
                },
              }}
            />
          </div>
          <span className="mt-2 text-xs font-light tracking-wider">Account</span>
        </button>

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-4 w-full px-2">
          <li>
            <button
              onClick={() => router.push('/dashboard')}
              className={getButtonClasses('/dashboard')}
            >
              <LayoutDashboard size={30} />
              <span className="mt-1 text-xs font-light">Dashboard</span>
            </button>
          </li>
        
          <li>
            <button
              onClick={() => router.push('/dashboard/calendar')}
              className={getButtonClasses('/dashboard/calendar')}
            >
              <CalendarDays size={30} />
              <span className="mt-1 text-xs font-light">Calendar</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/grades')}
              className={getButtonClasses('/dashboard/grades')}
            >
              <ClipboardList size={30} />
              <span className="mt-1 text-xs font-light">Grades</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/inbox')}
              className={getButtonClasses('/dashboard/inbox')}
            >
              <Inbox size={30} />
              <span className="mt-1 text-xs font-light">Inbox</span>
            </button>
          </li>
          
          <li>
            <button
              onClick={() => router.push('/dashboard/help')}
              className={getButtonClasses('/dashboard/help')}
            >
              <HelpCircle size={30} />
              <span className="mt-1 text-xs font-light">Help</span>
            </button>
          </li>
        </ul>

        {/* Sign Out / Back Button at Bottom */}
        <div className="mt-auto p-2 w-full">
          <button
            onClick={() => router.push('/')}
            className={getButtonClasses('/')}
          >
            <ArrowLeftCircle size={30} />
            <span className="mt-1 text-xs font-light">Back</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
