'use client'
import Link from 'next/link';
import AddNewPartModal from '../components/AddNewPartModal';
import { useState, useEffect } from 'react';

export default function PartsList() {
    // initial state is an empty array
    const [parts, setParts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


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

    const handleOpenModal = () => {
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        window.location.reload();
        setIsModalOpen(false); // Close the modal
    };

    const handleResetStock = async () => {
    const confirmReset = confirm('Are you sure you want to reset all parts stock to initial stock?');
    if (confirmReset) {
        try {
            const response = await fetch('http://localhost:3000/api/parts/reset-stock',
            {method: 'POST'});

            const data = await response.json();

            if (data.success) {
                alert(data.message);
        window.location.reload();
                // Optionally refresh the page or state to reflect the changes
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error resetting stock:', error);
            alert('Failed to reset stock: ' + error.message);
        }
    }
};

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
                    onClick={handleOpenModal}
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add Part
                </button>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                    onClick={handleResetStock}
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Reset All Parts Stock
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
                                   Initial Stock
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
                                <tr key={part._id} className=" divide-x devide-gray-200 ">
                                                                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                        <Link href={`/protected/parts/${part._id}`} passHref>
                                <button
                                                    type="button"
                                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    View part
                                                </button>
                                        </Link>
                                    </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 text-center">{part.name}</td>
                                    <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center">{part.initialStock}</td>
<td className={`whitespace-nowrap px-3 py-4 text-sm  text-center text-gray-500 ${part.initialStock !== part.currentStock ? 'bg-yellow-200' : ''}`}>{part.currentStock}</td>
                                    <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center">{part.boxQuantity}</td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 text-center sm:pr-0">{part.barCodeId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
                    <AddNewPartModal isOpen={isModalOpen} onClose={handleCloseModal} />

    </div>
);


}

