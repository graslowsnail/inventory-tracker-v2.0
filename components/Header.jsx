'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const xrainLogo = '/xrainLogo.jpg'

const navigation = [
  /* { name: 'Work Days', href: 'workdays' }, */
  { name: 'Parts', href: '/protected/parts' },
  { name: 'Part History', href: '/partHistory' },
]

export default function Header() {
  const {data: session } = useSession();

return (
  <header className="bg-white border-b-2">
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
      <div className="flex items-center gap-x-4 md:gap-x-12"> {/* Adjusted for responsiveness */}
        <Link href="/">
          <div className="-m-1.5 p-1.5 relative" style={{ height: '64px', width: '64px' }}> {/* Set a specific size for the logo container */}
            <span className="sr-only">Your Company</span>
            <img className="h-full w-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={xrainLogo} alt="" />
          </div>
        </Link>
      {session && (
      <div className="flex gap-x-4 md:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"> {/* Added hover effect for better UX */}
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
      <div className="flex items-center gap-x-4">
        {session ? (
          <>
            <span>{session.user.name}</span>
            <button onClick={() => signOut()} className="text-sm font-semibold leading-6 text-gray-900">
              Sign out
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className="text-sm font-semibold leading-6 text-gray-900">
            Sign in
          </button>
        )}
      </div>
    </nav>
  </header>
);
}

