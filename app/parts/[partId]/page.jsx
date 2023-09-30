// app/parts/partId
import React from 'react';

const SinglePartPage = ({ params }) => {
  const { partId } = params;
  console.log(partId);

  return (
    <div>
      hello world this is part {partId}
    </div>
  );
};

export default SinglePartPage
