import Part from '@/models/Part';
import ResetHistory from '@/models/ResetHistory';
import { NextResponse } from 'next/server';
import connectDb from '../../../../lib/connectDB.js';

export async function POST(req,res) {
    try {
        await connectDb();
        // fetch all parts to reset
        const partsToReset = await Part.find({});

        // filter parts to save, only those where the current stock is != to initialStock
        const usedPartsForHistory = partsToReset.filter(part => part.currentStock !== part.initialStock).map(part => ({
        partId: part._id,
        name: part.name,
        barCodeId: part.barCodeId,
        initialStock: part.initialStock,
        currentStockBeforeReset: part.currentStock,
        boxQuantity: part.boxQuantity,
        }));

        // Use the aggregation pipeline in updateMany to reference document fields
        const result = await Part.updateMany(
            {}, // filter (empty for all documents)
            [
                { $set: { currentStock: "$initialStock" } } // set currentStock to initialStock
            ]
        );

        // save reset history only if there are parts used 
        if ( usedPartsForHistory.length > 0) {
            const resetHistory = new ResetHistory({
                usedParts: usedPartsForHistory
            });
            await resetHistory.save();
        }
        
        return new NextResponse(JSON.stringify({ success: true, message: "All parts have been reset to their initial stock.", result }), { status: 200 });
    } catch (error) {
        console.error('Failed to reset parts stock:', error);
        return new NextResponse('Internal Server Error', { status: 500});
    }
};
