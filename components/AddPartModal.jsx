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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Add Part for {selectedDate}</h2>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  value={barCodeId}
                  onChange={(e) => setBarCodeId(e.target.value)}
                  placeholder="Enter Barcode ID"
                  className="border-4 rounded"
                  autoFocus
              />
              <div className="flex justify-end mt-6">

                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={onClose}>
                   Close
                </button>

                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                type="submit">Add Part
                </button>

              </div>
                </form>
            </div>
        </div>
  );
};
