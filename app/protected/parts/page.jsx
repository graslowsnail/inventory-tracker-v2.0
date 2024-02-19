// page.tsx is the ui for the /parts url path
//import { PartsList} from '@/components'
import PartsList from '../../../components/PartsList.jsx'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export default async function AllParts() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }


  return (
    <main className=''>
     <div className='text-center'> this is a protected route</div>
      <PartsList />
    </main>
  );
};
