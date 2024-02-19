// this POST request is to subtract from parts count
import { NextResponse } from 'next/server';
import Part from '@/models/Part';
import Usage from '@/models/Usage';
import moment from 'moment';

export const POST = async (req) => {
  // get barcode id and date from frotend.
  const { barCodeId, date } = await req.json();

  try {
    await connectDb();
    // find part by barCodeId
    const part = await Part.findOne({ barCodeId: barCodeId });
    if (!part) {
      console.log('part not found error');
      return new NextResponse('part not found', {status: 404 });
    }
    // ensure date is treated correctly
    const usageDate = moment.utc(date);

    // // Find or create usage document for selected date
    let usage = await Usage.findOne({ date: usageDate });
    if (!usage) {
      console.log('Usage Not Found Error');
      // If there's no usage for this date, there's nothing to decrement.
      return new NextResponse('Usage Not Found', { status: 404 });
    }
    // Find if part has been used on this date
    let partsUsage = usage.partsUsed.find(p => p.partId.equals(part._id));
    if (partsUsage && partsUsage.count > 0) {
      // Decrement count
      partsUsage.count--;

      // Upate the part's current stock by adding back the boxQuantity
      part.currentStock = part.currentStock + part.boxQuantity;
      await part.save(); // save the part document after updating;

      // Optionally remove part from usage if count is 0
      if (partsUsage.count === 0) {
        usage.partsUsed = usage.partsUsed.filter(p => !p.partId.equals(part._id));
      }
    } else {
      console.log('Part Usage Not Found Error');
      return new NextResponse('Part Usage Not Found', { status: 404 });
    }

    await usage.save();
    return NextResponse.json('Part Usage Updated', { status: 200 });

  } catch (error) {
    console.log('Failed to Update Part Usage:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
