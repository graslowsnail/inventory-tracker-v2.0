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
    <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
            <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <h2 className="text-xl text-center font-bold text-gray-900 px-4 py-5 pl-4 bg-white">
                        Part History Details - Reset Date:{" "}
                        {new Date(partHistory.resetDate).toLocaleString()}
                    </h2>
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                >
                                    Amount Used
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                >
                                    Current Stock Before Reset
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                >
                                    Box Quantity
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                >
                                    Initial Stock
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                >
                                    Barcode ID
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {partHistory.usedParts.map((part) => {
                                const boxesUsed = Math.ceil(
                                    (part.initialStock -
                                        part.currentStockBeforeReset) /
                                        part.boxQuantity
                                );
                                return (
                                    <tr key={part._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {part.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {boxesUsed}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {part.currentStockBeforeReset}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {part.boxQuantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {part.initialStock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {part.barCodeId}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
}

