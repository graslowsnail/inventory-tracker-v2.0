// app/usage/date
import { SingleUsageCard } from '@/components';

function UsageDatePage({ params }) {
    const { date } = params;
    console.log(date);

    return (
        <div>
        < SingleUsageCard date={date}/>
        </div>
    );
}

export default UsageDatePage;
