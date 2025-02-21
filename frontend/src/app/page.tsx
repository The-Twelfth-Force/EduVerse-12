'use client'

import { SignedIn, UserButton, useUser} from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, user, isSignedIn } = useUser();
  if (!isLoaded) {
    return <p>Loading...</p>
  }
  if (!isSignedIn) {
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
        <p>You are not signed in!</p>
        <button onClick={() => {
          window.location.href = '/sign-in'
        }}>Sign in</button>
      </div>
    );
  }

  const userType = user.publicMetadata.userType;
  console.log(user.publicMetadata);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <SignedIn>
        <UserButton />
        <p>You are signed in!</p>
        <p>you are a(n) {userType === 'stu' ? 'student' : 'instructor'}</p>
      </SignedIn>
    </div>
  );
}
