'use client'

import { useUser} from "@clerk/nextjs";
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
        <button onClick={() => {
          window.location.href = '/sign-in'
        }}>Sign in</button>
      </div>
    );
  }

  const userType = user.publicMetadata.userType;
  console.log(user.publicMetadata);
  if (userType === "stu") {
    Router.push("/student");
  }
  if (userType === "inst") { 
    Router.push("/instructor");
  }
}
