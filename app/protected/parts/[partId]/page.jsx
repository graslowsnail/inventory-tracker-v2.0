// app/parts/partId
import { SinglePartCard } from '@/components';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SinglePartPage({params}) {
  const { partId } = params;
  const session = await getServerSession();
  //console.log(partId);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <div>
     < SinglePartCard partId={partId}/>
    </div>
  );
};

