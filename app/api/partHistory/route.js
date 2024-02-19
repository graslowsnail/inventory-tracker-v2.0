import PartHistory from '@/models/ResetHistory';
import connectDb from '../../../lib/connectDB';

import { NextResponse } from "next/server";

// get function for all parts
export async function GET() {
  try {
    await connectDb();
    // Sort part history docuemtns from newest to oldest 
    const partHistorys = await PartHistory.find().sort({ resetDate: -1});
    console.log(partHistorys);
    return NextResponse.json({ partHistorys });
  }
  catch (error){
    console.log('Failed to fetch parts:', error);
    return new NextResponse('Internal Server Error', { status: 500});
  }

};
