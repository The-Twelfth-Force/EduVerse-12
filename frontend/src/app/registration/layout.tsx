'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { CheckIcon, ShoppingCartIcon, CalendarIcon, ArrowLeftCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RegistrationLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const userName = user?.firstName || 'Guest';

  // Helper function that returns appropriate classes based on active route
  const getButtonClass = (target: string) => {
    return `transition-transform hover:-translate-y-1 transition-colors ${
      pathname === target ? 'text-teal-200' : 'hover:text-teal-200'
    }`;
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 p-2 bg-gray-900 text-white">
        <ul className="flex flex-col space-y-4 pt-4 flex-1">
          <li>
            <div className="inline-flex justify-center items-center gap-2 px-4">
              <UserButton />
              <h1 className="font-bold">{userName}</h1>
            </div>
          </li>
          <li>
            <Button
              className={getButtonClass('/registration')}
              onClick={() => router.push('/registration')}
            >
              <CheckIcon />
              Register
            </Button>
          </li>
          <li>
            <Button
              className={getButtonClass('/registration/cart')}
              onClick={() => router.push('/registration/cart')}
            >
              <ShoppingCartIcon />
              Cart
            </Button>
          </li>
          <li>
            <Button
              className={getButtonClass('/registration/schedule')}
              onClick={() => router.push('/registration/schedule')}
            >
              <CalendarIcon />
              Schedule
            </Button>
          </li>
        </ul>
        {/* Back Button */}
        <div className="mt-auto p-2 w-full">
          <button
            onClick={() => router.push('/')}
            className={`w-full flex flex-col items-center p-2 rounded transition-colors transition-transform hover:-translate-y-1 ${pathname === '/' ? 'text-teal-200' : 'hover:text-teal-200'}`}
          >
            <ArrowLeftCircle size={24} />
            <span className="mt-1 text-xs font-light">Back</span>
          </button>
        </div>
      </div>
      <main className="h-full w-full">
        {children}
      </main>
    </div>
  );
}
