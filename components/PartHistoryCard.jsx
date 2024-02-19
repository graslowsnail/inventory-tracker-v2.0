'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PartHistoryCard() {
    const [partHistorys, setPartHistorys] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/partHistory');
                const data = await response.json();
                setPartHistorys(data.partHistorys);
                //console.log(data.partHistorys);
            } catch (error) {
                console.error("There was an error fetching the data:", error);
            }
        };
        fetchData();
    }, []); // Empty dependency array means this useEffect runs once when the component mounts
    const calculateBoxesUsed = (usedParts) => {
        return usedParts.reduce((total, part) => {
            const boxesUsed = Math.max(0, part.initialStock - part.currentStockBeforeReset) / part.boxQuantity;
            return total + boxesUsed;
        }, 0);
    };

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {partHistorys.map((partHistory) => (
                <Link key={partHistory._id} href={`/protected/partHistory/${partHistory._id}`} passHref>
                    <div
                        key={partHistory._id}
                        className="relative flex flex-col m-5 space-y-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                    >
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                Reset Date:{" "}
                                {new Date(partHistory.resetDate).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Different Parts Used: {partHistory.usedParts.length}
                            </p>
                            <p className="text-sm text-gray-500">
                                Total Items Used:{" "}
                                {calculateBoxesUsed(partHistory.usedParts).toFixed(
                                    2
                                )}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
