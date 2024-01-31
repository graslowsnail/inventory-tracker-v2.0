import connectDb from '@/lib/connectDb';
import { NextResponse, NextRequest } from 'next/server';
import Part from '@/models/Part';
import Usage from '@/models/Usage';

// POST 
export const POST = async (req) => {

  //get barCodeId and date from frontend.
  const { barCodeId, date } = await req.json();
  console.log(barCodeId, date);

  try{
    await connectDb();
    // find part by barcode ID
    const part = await Part.findOne({ barCodeId: barCodeId });
    if (!part) {
      console.log('FUCK NO PART FOUND ERROR');
      return new NextResponse('Part Not Found', { status: 404});

    }

    // Ensure date is treated correctly
    const usageDate = new Date(date);
    usageDate.setHours(0, 0, 0, 0);

    // Find or create usage document for selected date
    let usage = await Usage.findOne({ date: usageDate});
    if (!usage) {
      usage = new Usage({ date: usageDate, partsUsed: [] });
    }


    // Find if part has been used on this date
    let partsUsage = usage.partsUsed.find(p => p.partId.equals(part._id));
    if (partsUsage) {
      // Increment count
      partsUsage.count++;
    } else {
      // add new part usage
      usage.partsUsed.push({ partId: part._id, count:1 });
    }

    await usage.save();
    return NextResponse.json('Part Usage record3d', {status:200});
  }
  catch(error) {
    console.log('Failed to POST PART USAGE:', error);

    // Respond with an error status code and message
    return new NextResponse('Internal Server Error', { status: 500});
  }

};