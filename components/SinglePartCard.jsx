'use client'
import { useState, useEffect} from 'react';
import UpdatePartModal from '../components/UpdatePartModal';

export default function SinglePartCard({ partId }) {
  const [part, setPart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/parts/${partId}`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.status === 500) {
          // Part not found, redirect to the parts list page
          window.location.href = '/protected/parts';
          return;
        }

        const data = await response.json();
        if (!data.part) {
          // Handle other scenarios as needed
          return;
        }


        console.log(data);
        setPart(data.part);
      } 
      catch(error) {
        console.error('there was an error fetching the data:', error);
      }
    };

    fetchData();
  }, [partId]);

  const handleEdit = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this part?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/parts/${partId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete the part');
        }

        const data = await response.json();
        console.log(data.message);
        // Redirect or refresh the page, or show a success message
        // For example, using window.location.href to redirect:
        window.location.href = '/protected/parts'; // Adjust the URL to your parts list page
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
          <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
      </div>
    {/* Conditionally render the UpdatePartModal */}
      {isModalOpen && (
        <UpdatePartModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          part={part}
          onUpdate={() => {
            // You can refresh part data or take any other actions needed after an update
            console.log('Part updated');
            setIsModalOpen(false); // Optionally close the modal after update
          }}
        />
      )}
    </div>
  );
};
