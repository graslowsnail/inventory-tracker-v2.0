'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PartsList() {
    // initial state is an empty array
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                    const response = await fetch('http://localhost:3000/api/parts');
                    const data = await response.json();
                    setParts(data.parts);
                } catch (error) {
                    console.error("There was an error fetching the data:", error);
                }
            };
            
            fetchData();
    }, []);  // Empty dependency array means this useEffect runs once when the component mounts

  return (
    <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Parts</h1>
                <p className="mt-2 text-md text-gray-700">
                    A list of all the parts inside the consignment.
                </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add Part
                </button>
            </div>
        </div>
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300 border-t border-l border-r border-gray-300">
                        <thead>
                            <tr className="divide-x divide-gray-200">
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900">
                                    Actions
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                   Part Name 
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                   Current Stock 
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                    Box Quantity
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                   Bar Code Id 
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {parts.map((part) => (
                                <tr key={part.name} className="divide-x divide-gray-200">

                                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                        <Link href={`/parts/${part._id}`}>
                                                <button
                                                    type="button"
                                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    View part
                                                </button>
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 text-center">{part.name}</td>
                                    <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center">{part.currentStock}</td>
                                    <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center">{part.initialStock}</td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 text-center sm:pr-0">{part.barCodeId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
)

}

