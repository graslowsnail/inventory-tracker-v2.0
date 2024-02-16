// app/partHistory/partHistoryId
import SinglePartHistoryCard from '../../../components/SinglePartHistoryCard';

export default function SinglePartHistoryPage({ params }) {
  const { partHistoryId } = params;
  
return (
  <div>
  < SinglePartHistoryCard partHistoryId={partHistoryId}/>
  <h1 className='text-center'>
  single part history page
  </h1>
  </div>
)
};
