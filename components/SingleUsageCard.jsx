'use client';
import { useState, useEffect} from 'react';

export default function SingleUsageCard({date}) {
  console.log(date + 'FAGGOT');
  const [usage, setUsage] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/usage/${date}`);
        const data = await response.json();
        console.log(data);
        setUsage(data);
      }
      catch(error) {
        console.error('there was an error fetching usage:', error);
      }
    };

    fetchData();
  }, [date]); // add date ad a dependency 

  return (
    <div className="container mx-auto px-4 py-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Usage Details for {date}</h1>
                {usage.partsUsed?.map((part, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                        {/* Repeat this block for each part attribute */}
                        <div>
                            <h2 className="text-lg font-semibold">Part Name</h2>
                            <p className="text-gray-600">{part.partId.name}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Count</h2>
                            <p className="text-gray-600">{part.count}</p>
                        </div>
                        {/* Add other fields as needed */}
                    </div>
                ))}
            </div>
        </div>
  );
};
