import connectDb from '@/lib/connectDb';
import Part from '@/models/Part';
import { NextResponse } from 'next/server';

export async function POST(req,res) {
    try {
        await connectDb();


        // Use the aggregation pipeline in updateMany to reference document fields
        const result = await Part.updateMany(
            {}, // filter (empty for all documents)
            [
                { $set: { currentStock: "$initialStock" } } // set currentStock to initialStock
            ]
        );

        return new NextResponse(JSON.stringify({ success: true, message: "All parts have been reset to their initial stock.", result }), { status: 200 });
    } catch (error) {
        console.error('Failed to reset parts stock:', error);
        return new NextResponse('Internal Server Error', { status: 500});
    }
};
