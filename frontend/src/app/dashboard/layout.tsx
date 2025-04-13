'use client';

//import {SignedOut} from "@clerk/nextjs";
import { useUser, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Inbox,
  Clock,
  HelpCircle,
  ArrowLeftCircle,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useUser();
  const userName = user?.firstName || 'Guest';

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-22 bg-gray-900 text-white flex flex-col items-center">
        {/* Profile Section as a clickable nav element */}
        <button
          //onClick={() => router.push('/profile')}
          className="pt-8 pb-4 flex flex-col items-center focus:outline-none"
        >
          <div className="rounded-full bg-white/100 p-2 w-9 h-9 flex items-center justify-center">
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
              className="w-full flex flex-col items-center p-2 rounded hover:bg-teal-200 hover:text-gray-900 transition-colors"
            >
              <LayoutDashboard size={30} />
              <span className="mt-1 text-xs font-light">Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/courses')}
              className="w-full flex flex-col items-center p-2 rounded hover:bg-teal-200 hover:text-gray-900 transition-colors"
            >
              <BookOpen size={30} />
              <span className="mt-1 text-xs font-light">Courses</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/calendar')}
              className="w-full flex flex-col items-center p-2 rounded hover:bg-teal-200 hover:text-gray-900 transition-colors"
            >
              <CalendarDays size={30} />
              <span className="mt-1 text-xs font-light">Calendar</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/inbox')}
              className="w-full flex flex-col items-center p-2 rounded hover:bg-teal-200 hover:text-gray-900 transition-colors"
            >
              <Inbox size={30} />
              <span className="mt-1 text-xs font-light">Inbox</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/history')}
              className="w-full flex flex-col items-center p-2 rounded hover:bg-teal-200 hover:text-gray-900 transition-colors"
            >
              <Clock size={30} />
              <span className="mt-1 text-xs font-light">History</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/help')}
              className="w-full flex flex-col items-center p-2 rounded hover:bg-teal-200 hover:text-gray-900 transition-colors"
            >
              <HelpCircle size={30} />
              <span className="mt-1 text-xs font-light">Help</span>
            </button>
          </li>
        </ul>

        

        {/* Back Button at Bottom */}
        <div className="mt-auto p-2 w-full">
          <button
            onClick={() => router.push('/')}
            className="w-full flex flex-col items-center p-2 rounded hover:bg-teal-200 hover:text-gray-900 transition-colors"
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
