'use client'
import { useState } from 'react';

export default function AddPartModal({ isOpen, onClose, onSave, selectedDate }) {
  const [barCodeId, setBarCodeId] = useState('');

  const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you'd call an API to add the part to the usage document for `selectedDate`
        onSave(barCodeId, selectedDate);
        onClose(); // Close the modal after saving
    };

    if (!isOpen) return null;

  return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Add Part for {selectedDate}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={barCodeId}
                        onChange={(e) => setBarCodeId(e.target.value)}
                        placeholder="Enter Barcode ID"
                        autoFocus
                    />
                    <button type="submit">Add Part</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
