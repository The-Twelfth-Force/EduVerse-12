'use client'

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoaded, user, isSignedIn } = useUser();
  const Router = useRouter();
  if (!isLoaded) {
    return <p>Loading...</p>
  }
  if (!isSignedIn) {
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
        <p>You are not signed in!</p>
        <Button onClick={() => {
          Router.push("/sign-in");
        }}>Sign in</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className='flex flex-row items-center justify-center space-x-3'>
        <p className="mt-4 justify-center">Welcome, {user?.firstName}!</p>
        <UserButton />
      </div>
      <p className="mt-4">Go to:</p>
      <div className="flex items-center justify-center space-x-2">
        <Button onClick={() => Router.push("/registration")}>Registration</Button>
        <Button onClick={() => Router.push("/dashboard")}>Dashboard</Button>
      </div>
    </div>
  );

  /* const userType = user.publicMetadata.userType;
  console.log(user.publicMetadata);
  if (userType === "stu") {
    Router.push("/student");
  }
  if (userType === "inst") { 
    Router.push("/instructor");
  } */
}
