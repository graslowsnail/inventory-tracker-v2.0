'use client'
import { useState, useEffect} from 'react';

export default function SinglePartCard({ partId }) {
  const [part, setPart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/parts/${partId}`);
        const data = await response.json();
        console.log(data);
        setPart(data.part);
      } 
      catch(error) {
        console.error('there was an error fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this part?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/parts/${partId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete the part');
        }

        const data = await response.json();
        console.log(data.message);
        // Redirect or refresh the page, or show a success message
        // For example, using window.location.href to redirect:
        window.location.href = '/parts'; // Adjust the URL to your parts list page
      } catch (error) {
        console.error("Error deleting the part:", error);
        // Handle error (e.g., show an error message)
      }
    }
  };


  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Part Information</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold">Name</h2>
            <p className="text-gray-600">{part.name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Barcode ID</h2>
            <p className="text-gray-600">{part.barCodeId}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Box Quantity</h2>
            <p className="text-gray-600">{part.boxQuantity}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Current Stock</h2>
            <p className="text-gray-600">{part.currentStock}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Initial Stock</h2>
            <p className="text-gray-600">{part.initialStock}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Size</h2>
            <p className="text-gray-600">{part.size}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};
