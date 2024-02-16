// single part history card
'use client'
import { useState, useEffect } from 'react';

export default function SinglePartHistoryCard({ partHistoryId }) {
  const [partHistory, setPartHistory] = useState(null);

  useEffect(() => {
    async function fetchPartHistory() {
      try {
        // Assuming you have an API endpoint like /api/partHistory/{partHistoryId}
        const response = await fetch(`http://localhost:3000/api/partHistory/${partHistoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setPartHistory(data.partHistory);
      } catch (error) {
        console.error("Error fetching part history:", error);
      }
    }

    fetchPartHistory();
  }, [partHistoryId]); // Fetch part history when component mounts or partHistoryId changes

  if (!partHistory) {
    return <div>Loading part history...</div>;
  }

  return (
<div className="p-4 pt-5 rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold">Part History Details</h2>
      <p>Reset Date: {new Date(partHistory.resetDate).toLocaleString()}</p>
      <div>
        <h3 className="text-lg font-semibold">Used Parts</h3>
        {partHistory.usedParts.length > 0 ? (
          partHistory.usedParts.map((part) => {
            // Calculate boxes used for each part
            const boxesUsed = (part.initialStock - part.currentStockBeforeReset) / part.boxQuantity;

            return (
              <div key={part._id} className="mt-2">
                <p><strong>Name:</strong> {part.name}</p>
                <p><strong>Barcode ID:</strong> {part.barCodeId}</p>
                <p><strong>Initial Stock:</strong> {part.initialStock}</p>
                <p><strong>Current Stock Before Reset:</strong> {part.currentStockBeforeReset}</p>
                <p><strong>Box Quantity:</strong> {part.boxQuantity}</p>
                <p><strong>Boxes Used:</strong> {boxesUsed}</p> {/* Display calculated boxes used */}
              </div>
            );
          })
        ) : (
          <p>No used parts.</p>
        )}
      </div>
    </div>  );
}

