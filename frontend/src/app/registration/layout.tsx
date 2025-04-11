'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import { CheckIcon, ShoppingCartIcon, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export default function RegistrationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user } = useUser();
    const userName = user?.firstName || 'Guest';
    return (
        <div className="flex h-screen">
            <div className="flex-col justify-center p-2 bg-gray-900 text-white">
                <ul className='flex flex-col space-y-4 pt-4'>
                   <li>
                        <div className="inline-flex justify-center items-center gap-2 px-4">
                            <UserButton />
                            <h1 className="font-bold ">{userName}</h1>
                        </div>
                    </li>
                    <li>
                        <Button className="transition-transform hover:-translate-y-1 active:translate-y-0.5" onClick={() => router.push('/registration')}>
                            <CheckIcon className="" />
                            Register
                        </Button>
                    </li>
                    <li>
                        <Button className="transition-transform hover:-translate-y-1 active:translate-y-0.5" onClick={() => router.push('/registration/cart')}>
                            <ShoppingCartIcon className="" />
                            Cart
                        </Button>
                    </li>
                    <li>
                        <Button className="transition-transform hover:-translate-y-1 active:translate-y-0.5" onClick={() => router.push('/registration/schedule')}>
                            <CalendarIcon className="" />
                            Schedule
                        </Button>
                    </li>
                </ul>
            </div>
            <main className="h-full w-full">
                {children}
            </main>
        </div>
    );
}