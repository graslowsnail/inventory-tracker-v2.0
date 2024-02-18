'use client';
import { useState, useEffect, useRef } from 'react';

export default function SingleUsageCard({date}) {
  //console.log(date + 'DANG');
  const [usage, setUsage] = useState({}); const [barCodeId, setBarCodeId] = useState('');
  const inputRef = useRef(null); // creates a ref for the input
  const [errorMessage, setErrorMessage] = useState('');

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

    // Ftch data on component mount and when date changes
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
          setErrorMessage(error.message);

            // Handle the error state here
        }
    };

  const handleDeletePart = async (barCodeId) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/usage/subtractCount`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, barCodeId, action: 'decrement' }),
            });
            if (!response.ok) {
              throw new Error('Failed to update part count');
            }

            // Refresh the usage data to reflect the change
            fetchUsageData();
          } catch (error) {
            console.error('Error deleting one part:', error);
            setErrorMessage('Failed to delete one part');
          }
  };

  return (
    <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Parts Used on {date}
            </h1>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Enter Barcode ID</h2>

                <form onSubmit={handleAddPart}>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Barcode ID"
                        type="text"
                        value={barCodeId}
                        onChange={(e) => setBarCodeId(e.target.value)}
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
                    <div className="mt-4 text-red-500">{errorMessage}</div>
                )}
            </div>

    
     <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300 border-t border-l border-r border-b border-gray-300">
                        <thead>
                            <tr className="divide-x divide-gray-200">
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                   Current Stock 
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                    Barcode Id
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                   Part Name 
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                    Used Today
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {usage.partsUsed?.map((part, index) => (
                            <tr key={index} className="divide-x divide-gray-200">
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center">
                                {part.partId ? part.partId.currentStock : 'N/A'}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 text-center sm:pr-0">
                                {part.partId ? part.partId.barCodeId : 'N/A'}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 text-center">
                                {part.partId ? part.partId.name : 'Part Deleted'}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center">
                                {part.count}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                <button
                                  onClick={() => handleDeletePart(part.partId ? part.partId.barCodeId : '')}
                                  type="button"
                                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Delete One
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
  );
};

