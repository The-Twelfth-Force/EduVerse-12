'use client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function StudentDash() {
    const { isSignedIn, user, isLoaded } = useUser();
    const Router = useRouter();
    if (!isLoaded || !user) {
        return <p>Loading...</p>
    }
    if (!isSignedIn) {
        Router.push('/sign-in')
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">

            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <div className='flex flex-row items-center justify-center space-x-3'>
                <p className="mt-4 justify-center">Welcome, {user?.firstName}!</p>
            </div>
        </div>
    )
}

