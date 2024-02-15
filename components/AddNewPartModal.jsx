'use client';
import { useState } from 'react';

export default function AddNewPartModal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [barCodeId, setBarCodeId] = useState('');
    const [initialStock, setInitialStock] = useState('');
    const [boxQuantity, setBoxQuantity] = useState('');

    const handleSubmit = async (event) => {
    event.preventDefault();
    const newPart = {
        name,
        size,
        barCodeId,
        initialStock: Number(initialStock) || undefined,
        boxQuantity: Number(boxQuantity),
        currentStock: Number(initialStock) || undefined,
    };

    try {
        const response = await fetch('/api/parts', { // Adjust the URL path as necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPart),
        });

        if (!response.ok) {
            throw new Error('Failed to add new part');
        }

        // Optionally, process the response data...
        const data = await response.json();
        console.log('Part added successfully:', data);

        // Close the modal
        onClose();
        } catch (error) {
            console.log(newPart);
            console.error("Error adding new part:", error);
            // Handle error (e.g., show an error message)
        }
    };

    
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
    <div className="modal p-4 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Add New Part</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="part-name">Part Name</label>
                <input
                    id="part-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Part Name"
                    autoFocus
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">Size</label>
                <input
                    id="size"
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Size"
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="box-quantity">Box Quantity</label>
                <input
                    id="box-quantity"
                    type="number"
                    value={boxQuantity}
                    onChange={(e) => setBoxQuantity(e.target.value)}
                    placeholder="Box Quantity"
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barcode-id">Barcode ID</label>
                <input
                    id="barcode-id"
                    type="text"
                    value={barCodeId}
                    onChange={(e) => setBarCodeId(e.target.value)}
                    placeholder="Barcode ID"
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="initial-stock">Initial Stock</label>
                <input
                    id="initial-stock"
                    type="number"
                    value={initialStock}
                    onChange={(e) => setInitialStock(e.target.value)}
                    placeholder="Initial Stock"
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
                    <div className="flex justify-end mt-6">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        type="submit">Add Part
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

