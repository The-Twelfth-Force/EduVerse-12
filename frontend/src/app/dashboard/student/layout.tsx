"use client"
import { useUser, UserButton } from "@clerk/nextjs";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isSignedIn, user, isLoaded } = useUser();
    const navLinks = [
        { name: 'Home', href: '/dashboard/student' },
        { name: 'My Courses', href: '/dashboard/student/courses' },
        { name: 'Assignments', href: '/dashboard/student/assignments' },
        { name: 'Grades', href: '/dashboard/student/grades' },
        { name: 'Profile', href: '/dashboard/student/profile' },
    ];
    return (
        <div className="flex min-h-screen p-4">
            <div className="flex flex-col w-64 bg-gray-100 rounded-lg mr-4 p-4 shadow-md">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <nav>
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="block p-2 text-gray-700 hover:bg-gray-200 rounded-md"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <UserButton/>
            </div>
            {children}
        </div>
    )
}