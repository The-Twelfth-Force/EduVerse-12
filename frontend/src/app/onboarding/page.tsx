'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'


export default function OnboardingComponent() {
    const [error, setError] = useState('')
    const { user } = useUser()
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const res = await completeOnboarding(formData)
        if (res?.message) {
            // Reloads the user's data from the Clerk API
            await user?.reload()
            router.push('/')
        }
        if (res?.error) {
            setError(res?.error)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1>Are you an instructor or a student</h1>
            <form action={handleSubmit}>
            <div className="flex gap-4 mb-4">
                <button type="submit" name="role" value="instructor" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                    </svg>
                    Instructor
                </button>
                <button type="submit" name="role" value="student" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Student
                </button>
            </div>
            {error && <p className="text-red-600">Error: {error}</p>}
            </form>
        </div>
    )
}