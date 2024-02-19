import PartHistoryCard from '../../../components/PartHistoryCard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export default async function AllPartHistory() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <main className=''>
      <h1 className='text-center'> Reset History list</h1>
      < PartHistoryCard />
    </main>
  );
};
