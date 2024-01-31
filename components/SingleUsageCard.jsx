'use client';
import { useState, useEffect, useRef } from 'react';

export default function SingleUsageCard({date}) {
  //console.log(date + 'FAGGOT');
  const [usage, setUsage] = useState({});
  const [barCodeId, setBarCodeId] = useState('');
  const inputRef = useRef(null); // creates a ref for the input
  const [ errorMessage, setErrorMessage] = useState('');

// Function to fetch usage data
    const fetchUsageData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/usage/${date}`);
            const data = await response.json();
            setUsage(data);
        } catch (error) {
            console.error('There was an error fetching usage:', error);
        }
    };

    // Fetch data on component mount and when date changes
    useEffect(() => {
        fetchUsageData();
    }, [date]);


  const handleAddPart = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/usage/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ barCodeId, date }),
            });

            if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Error adding part');
            return;
        }

          // reset the input field and refoucus
          setBarCodeId('');
          inputRef.current.focus(); // refoucus on the input field
          setErrorMessage('');

          // Re-fetch usage data to update the count
            fetchUsageData();
          console.log('bar code id scaned correctly '+ barCodeId);

        } catch (error) {
            console.error(error.message);
          setBarCodeId('');
          inputRef.current.focus();
          setErrorMessage('A Part with this Barcode was not found: Try again');

            // Handle the error state here
        }
    };

  return (
    <div className="container mx-auto px-4 py-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Parts Used on {date}</h1>
                {usage.partsUsed?.map((part, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                        {/* Repeat this block for each part attribute */}
                        <div>
                            <h2 className="text-lg font-semibold">Part Name</h2>
                            <p className="text-gray-600">{part.partId.name}</p>
                            <p className="text-gray-600">{'part barCodeId ' + part.partId.barCodeId}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Count</h2>
                            <p className="text-gray-600">{part.count}</p>
                        </div>
                        {/* Add other fields as needed */}
                    </div>
                ))}

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Enter Barcode ID</h2>

                <form onSubmit={handleAddPart}>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Barcode ID"
                    type="text"
                    value={barCodeId}
                    onChange={(e) => setBarCodeId(e.target.value)} 
                    placeholder="Enter Barcode ID"
                    autoFocus // select input box upon load
                  ref={inputRef} // Attach the ref here


                
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                    type="submit"
                  >
                    Add Part
                  </button>
              </form>
    {/* Error message display */}
{errorMessage && (
    <div className="mt-4 text-red-500">
        {errorMessage}
    </div>
)}

              </div>
          </div>
        </div>
  );
};
