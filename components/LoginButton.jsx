'use client'
import { signIn } from 'next-auth/react';

const LoginButton = () => (
  <button
    onClick={() => signIn()} // This initiates the sign-in flow
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Sign in
  </button>
);

export default LoginButton;

