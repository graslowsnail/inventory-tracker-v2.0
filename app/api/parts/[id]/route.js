import connectDb from '@/lib/connectDb';
import Part from '@/models/Part';
import { NextResponse } from "next/server";

// GET part by id
export const GET = async (request) => {
  const partId = request.url.split('parts/')[1];
   
  try {
    await connectDb();
    const part = await Part.findOne({ _id: partId});
    //console.log(part);

    return NextResponse.json({ part });
  } catch (error) {
    console.error('fuck failed to fetch part:', error);
    return new NextResponse('Internal Server Error',{ status: 500});
  }
};

