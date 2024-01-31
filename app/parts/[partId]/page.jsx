// app/parts/partId
import { SinglePartCard } from '@/components';

const SinglePartPage = ({ params }) => {
  const { partId } = params;
  //console.log(partId);

  return (
    <div>
     < SinglePartCard partId={partId}/>
    </div>
  );
};

export default SinglePartPage
