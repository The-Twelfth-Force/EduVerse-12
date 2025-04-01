import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const { sessionClaims } = await auth()
  const metadata = sessionClaims?.publicMetadata as {
    userType: string,
    onboardingComplete: boolean
  }

  if (metadata?.onboardingComplete == true) {
    if (metadata?.userType === 'stu') {
      redirect('/dashboard/student')
    } else if (metadata?.userType === 'inst') {
      redirect('/dashboard/instructor')
    }
  }

  return <>{children}</>
}