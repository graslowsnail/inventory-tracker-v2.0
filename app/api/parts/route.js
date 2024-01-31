import connectDb from '@/lib/connectDb';
import Part from '@/models/Part';

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
    // Respond with an error status code and message
    return new NextResponse('Internal Server Error', { status: 500});
  }

};

