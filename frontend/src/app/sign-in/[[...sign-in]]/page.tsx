'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#d1f4f9] via-[#e1e9ff] to-[#f0e4ff]">
      <div className="grid w-full flex-grow items-center bg-inherit px-4 pt-40 sm:justify-center">
        {/* Apply the custom animation via the class "animate-fadeInUp" */}
        <div className="animate-fadeInUp">
          <SignIn.Root>
            <SignIn.Step
              name="start"
              className="w-full max-w-sm mx-auto space-y-6 rounded-2xl bg-neutral-900 bg-[radial-gradient(circle_at_50%_0%,theme(colors.white/10%),transparent)] px-4 py-10 ring-1 ring-inset ring-white/5 sm:w-96 sm:px-8"
            >
              <header className="text-center">
                <h1 className="mt-4 text-xl font-medium tracking-tight text-white">
                  Sign in
                </h1>
              </header>
              <Clerk.GlobalError className="block text-sm text-red-400" />
              <div className="space-y-4">
                <Clerk.Field name="identifier" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-white">Username</Clerk.Label>
                  <Clerk.Input
                    type="text"
                    required
                    className="w-full rounded-md bg-neutral-900 px-3.5 py-2 text-sm text-white outline-none ring-1 ring-inset ring-zinc-700 hover:ring-zinc-600 focus:ring-[1.5px] focus:ring-blue-400"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
                <Clerk.Field name="password" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-white">Password</Clerk.Label>
                  <Clerk.Input
                    type="password"
                    required
                    className="w-full rounded-md bg-neutral-900 px-3.5 == py-2 text-sm text-white outline-none ring-1 ring-inset ring-zinc-700 hover:ring-zinc-600 focus:ring-[1.5px] focus:ring-blue-400"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </div>
              <SignIn.Action
                submit
                className="relative isolate w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70"
              >
                Sign In
              </SignIn.Action>
              <p className="text-center text-sm text-zinc-500">
                No account?{' '}
                <Clerk.Link
                  navigate="sign-up"
                  className="font-medium text-white underline decoration-white/20 underline-offset-4 hover:underline focus-visible:underline"
                >
                  Create an account
                </Clerk.Link>
              </p>
            </SignIn.Step>
          </SignIn.Root>
        </div>
      </div>
      {/* Inline global styles for our custom animation */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
