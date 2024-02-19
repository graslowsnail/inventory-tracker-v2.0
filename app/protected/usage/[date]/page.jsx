// app/usage/date
import { SingleUsageCard } from '@/components';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function UsageDatePage({ params }) {
    const { date } = params;
    console.log(date);

    const session = await getServerSession();
      if (!session || !session.user) {
        redirect('/api/auth/signin');
      }

    return (
        <div>
        < SingleUsageCard date={date}/>
        </div>
    );
}

