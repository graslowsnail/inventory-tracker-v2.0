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

// delete part from parts collection
export const DELETE = async (request) => {
  try {
    await connectDb();
    //const { partId } = req.query; // Get the partId from the URL
    const partId = request.url.split('parts/')[1];
    console.log(partId);
    const deletedPart = await Part.findByIdAndDelete(partId);

    if (!deletedPart) {
      return new NextResponse('part not found', { status: 404});
    }
      return NextResponse.json('Part deleted', {status:200, deletedPart});
    } catch (error) {
      return new NextResponse('failed to delete part', { status: 500});
  }
};



