'use client';
import { useState } from 'react';

export default function UpdatePartModal({ isOpen, onClose, part, onUpdate }) {
  const [name, setName] = useState(part.name);
  const [size, setSize] = useState(part.size);
  const [barCodeId, setBarCodeId] = useState(part.barCodeId);
  const [initialStock, setInitialStock] = useState(part.initialStock);
  const [boxQuantity, setBoxQuantity] = useState(part.boxQuantity);
  const [currentStock, setCurrentStock] = useState(part.currentStock);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedPart = {
      name,
      size,
      barCodeId,
      initialStock: Number(initialStock),
      boxQuantity: Number(boxQuantity),
      currentStock: Number(currentStock),
    };

    try {
        const response = await fetch(`http://localhost:3000/api/parts/${part._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPart),
      });

      if (!response.ok) {
        throw new Error('Failed to update part');
      }

      // Optionally, process the response data...
      const data = await response.json();
      console.log('Part updated successfully:', data);
      onUpdate(); // Call the onUpdate function passed as prop
      onClose(); // Close the modal
      window.location.reload();// Refresh the page to reflect updated data

    } catch (error) {
      console.error("Error updating part:", error);
      // Handle error (e.g., show an error message)
    }
  };

  if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
    <div className="modal p-4" onClick={(e) => e.stopPropagation()}>
        <h2 className='text-center font-bold text-xl mb-4'>Update Part</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="part-name">
                    Part Name
                </label>
                <input
                    id="part-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Part Name"
                    autoFocus
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
                    Size
                </label>
                <input
                    id="size"
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Size"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="box-quantity">
                    Box Quantity
                </label>
                <input
                    id="box-quantity"
                    type="number"
                    value={boxQuantity}
                    onChange={(e) => setBoxQuantity(e.target.value)}
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Box Quantity"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barcode-id">
                    Barcode ID
                </label>
                <input
                    id="barcode-id"
                    type="text"
                    value={barCodeId}
                    onChange={(e) => setBarCodeId(e.target.value)}
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Barcode ID"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="initial-stock">
                    Initial Stock
                </label>
                <input
                    id="initial-stock"
                    type="number"
                    value={initialStock}
                    onChange={(e) => setInitialStock(e.target.value)}
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Initial Stock"
                />
            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                type="submit">Update Part
                </button>

                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={onClose}>Close
                </button>
            </div>
        </form>
    </div>
</div>

    );
};


