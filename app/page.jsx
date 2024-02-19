// page.tsx is the ui for the / url path
import  MyCalendar from '../components/MyCalendar.jsx'
import  LoginButton from '../components/LoginButton'
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  return (
  <>
    {session?.user?.name ? (
      <>
        <div>{session?.user?.name}</div>
        <MyCalendar />
      </>
    ) : (

      <div className='flex flex-col items-center justify-center h-screen space-y-4 p-4'>
      <h2 className='text-xl font-semibold text-gray-800'>Welcome!</h2>
      <p className='text-gray-600'>You must be logged in to access this page.</p>
      <LoginButton />
    </div>

    )}
  </>
);
};
