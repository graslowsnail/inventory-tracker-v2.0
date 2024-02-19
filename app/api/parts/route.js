import Part from '@/models/Part';
import connectDb from '../../../lib/connectDB';

import { NextResponse } from "next/server";

// get function for all parts
export async function GET() {
  try {
    await connectDb();
    const parts = await Part.find();
    // console.log(parts);
    return NextResponse.json({ parts });
  }
  catch (error){
    console.log('Failed to fetch parts:', error);
    return new NextResponse('Internal Server Error', { status: 500});
  }

};

// POST for adding part into Part collection
export const POST = async (req, res) => {
  try {
    await connectDb(); // Ensure database connection
    
    // parse req.body to json
    const body = await req.body.getReader().read().then(({ value, done }) => {
      return new TextDecoder().decode(value);
    });
    const data = JSON.parse(body);
    const { name, size, barCodeId, initialStock, boxQuantity } = data;

    // Create a new document in the 'parts' collection
    const newPart = await Part.create({
      name,
      size,
      boxQuantity,
      currentStock: initialStock, // Assuming initialStock is the starting point for currentStock
      initialStock,
      barCodeId,
    });

    console.log(newPart);

    // Successfully created the new part
    return NextResponse.json('part added',{ status:200});
  } catch (error) {
    console.error('Failed to add new part:', error);
    return new NextResponse('Internal Server Error', { status: 500});
  }
};

