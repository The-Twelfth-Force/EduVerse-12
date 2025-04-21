"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const closeDrawer = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.push("/dashboard");
    }, 300); // Duration matches the transition
  };

  return (
    <div className="relative h-full">
      {/* Account Drawer sliding in within main content area */}
      <div
        className={`absolute top-0 left-0 h-full w-full max-w-md bg-gray-800 text-white transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Account</h2>
          <button onClick={closeDrawer} className="text-gray-300 hover:text-white focus:outline-none">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          {/* Add your account details or links here */}
          <p>Your account details go here.</p>
        </div>
      </div>
    </div>
  );
}
