// app/partHistory/partHistoryId
import SinglePartHistoryCard from '../../../components/SinglePartHistoryCard';

export default function SinglePartHistoryPage({ params }) {
  const { partHistoryId } = params;
  
return (
  <div>
  < SinglePartHistoryCard partHistoryId={partHistoryId}/>
  single part history page
  </div>
)
};
