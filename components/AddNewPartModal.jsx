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
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Add New Part</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Part Name"
                        autoFocus
                        className="input bt-grey-200"
                    />
                    <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="Size"
                        className="input"
                    />
                    <input
                        type="number"
                        value={boxQuantity}
                        onChange={(e) => setBoxQuantity(e.target.value)}
                        placeholder="Box Quantity"
                        className="input"
                    />
                    <input
                        type="text"
                        value={barCodeId}
                        onChange={(e) => setBarCodeId(e.target.value)}
                        placeholder="Barcode ID"
                        className="input"
                    />
                    <input
                        type="number"
                        value={initialStock}
                        onChange={(e) => setInitialStock(e.target.value)}
                        placeholder="Initial Stock"
                        className="input"
                    />
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

