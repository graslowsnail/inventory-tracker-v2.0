import connectDb from '@/lib/connectDb';
import PartHistory from '@/models/ResetHistory';

import { NextResponse } from "next/server";

// get function for all parts
export async function GET() {
  try {
    await connectDb();
    const partHistorys = await PartHistory.find();
    console.log(partHistorys);
    return NextResponse.json({ partHistorys });
  }
  catch (error){
    console.log('Failed to fetch parts:', error);
    return new NextResponse('Internal Server Error', { status: 500});
  }

};
