'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function SelectTermPage() {
  const [selectedTerm, setSelectedTerm] = useState('2025 Spring')
  const router = useRouter()

  const handleSubmit = () => {
    // Save to localStorage
    localStorage.setItem('selectedTerm', selectedTerm)
    // Navigate to register page
    router.push('/registration')
  }

  const terms = ['2025 Spring', '2025 Summer', '2025 Fall']

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-xl font-semibold mb-6">Select Term</h1>
      <div className="w-full max-w-sm space-y-3">
        <p className="font-medium text-base">Term</p>
        {terms.map((term) => (
          <div key={term} className="flex items-center space-x-2">
            <input
              type="radio"
              id={term}
              name="term"
              value={term}
              checked={selectedTerm === term}
              onChange={() => setSelectedTerm(term)}
              className="accent-teal-500 w-4 h-4"
            />
            <label htmlFor={term} className="text-sm">{term}</label>
          </div>
        ))}
      </div>
      <Button
        className="mt-6 bg-teal-200 text-black hover:bg-teal-300 px-4 py-2 text-sm rounded"
        onClick={handleSubmit}
      >
        ✔ Save and Continue
      </Button>
    </div>
  )
}
