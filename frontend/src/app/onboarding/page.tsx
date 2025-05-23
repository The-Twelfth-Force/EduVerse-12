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
        const clerkID = user?.id
        const School_Email = user?.emailAddresses[0]?.emailAddress
        const Password = user?.id

        try {
            const res = await fetch('/api/saveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clerkID, School_Email, Password }),
            })
            const data = await res.json()
            if (res.status === 201) {
                console.log('User saved successfully:', data)
            } else {
                console.error('Error saving user:', data)
                setError(data.error)
            }
        } catch (error) {
            console.error('Error saving user:', error)
            setError('Failed to save user')
        }

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
                <div className="flex items-center space-x-4">
                    <label>
                        <input type="radio" name="userType" value="stu" required />
                        Student
                    </label>
                    <label>
                        <input type="radio" name="userType" value="inst" required />
                        Instructor
                    </label>
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Submit
                </button>
                {error && <p className="text-red-600">Error: {error}</p>}
            </form>
        </div>
    )
}