// app/partHistory/partHistoryId
import SinglePartHistoryCard from '../../../../components/SinglePartHistoryCard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SinglePartHistoryPage({ params }) {
  const { partHistoryId } = params;
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }
  
return (
  <div>
    < SinglePartHistoryCard partHistoryId={partHistoryId}/>
  </div>
)
};
