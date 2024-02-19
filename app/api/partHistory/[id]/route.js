import PartHistory from '@/models/ResetHistory';
import { NextResponse } from "next/server";

// GET part by id
export const GET = async (request) => {
  const partHistoryId = request.url.split('partHistory/')[1];
  console.log(partHistoryId);
   
  try {
    await connectDb();
    const partHistory = await PartHistory.findOne({ _id: partHistoryId});
    console.log(partHistory);

    if (!partHistory) {
      console.log('No PartHistory found with ID:', partHistoryId);
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json({ partHistory });
  } catch (error) {
    console.error('fuck failed to fetch part:', error);
    return new NextResponse('Internal Server Error',{ status: 500});
  }
};

