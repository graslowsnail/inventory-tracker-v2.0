import { NextResponse } from 'next/server';
import Part from '@/models/Part';
import Usage from '@/models/Usage';
import moment from 'moment';

// GET all usages
export const GET = async (req) => {
  try{
    await connectDb();
    const usageData = await Usage.find({}); // fetch all usage data

    // Transform the data for the calendar
    const calendarData = usageData.map(usage => {
      return{
        titile: `Parts Used: ${usage.partsUsed.length}`,
        start: new Date(usage.date),
        end: new Date(usage.date),
        allDay: true,
        resource: usage // you can include the original usage data here
      };
    });

    //console.log(calendarData);

    return NextResponse.json(calendarData, {status:200});
  }
  catch (error) {
    console.error('failed to fetch usage data: ', error);
    return new NextResponse('usage data fetch error', { status: 500});
  }
};

// POST req to create usage document and add parts inside that usage. also increment the parts count
export const POST = async (req) => {

  //get barCodeId and date from frontend.
  const { barCodeId, date } = await req.json();
  //console.log(barCodeId, date);

  try{
    await connectDb();
    // find part by barcode ID
    const part = await Part.findOne({ barCodeId: barCodeId });
    if (!part) {
      console.log('FUCK NO PART FOUND ERROR');
      return new NextResponse('Part Not Found', { status: 404});

    }

    // Ensure date is treated correctly
    //console.log(date);
    const usageDate = moment.utc(date);
    console.log(usageDate);

    // Find or create usage document for selected date
    let usage = await Usage.findOne({ date: usageDate});
    if (!usage) {
      usage = new Usage({ date: usageDate, partsUsed: [] });
    }


    // Find if part has been used on this date
    let partsUsage = usage.partsUsed.find(p => p.partId.equals(part._id));
if (partsUsage) {
      // Increment count only if currentStock - boxQuantity >= 0
      if (part.currentStock - part.boxQuantity >= 0) {
        partsUsage.count++;
        part.currentStock -= part.boxQuantity; // Decrement currentStock by boxQuantity
      } else {
        console.log('this part is out of stock');
        return new NextResponse('part out of stock', { status: 400 });
      }
    } else {
      // Add new part usage if currentStock - boxQuantity >= 0
      if (part.currentStock - part.boxQuantity >= 0) {
        usage.partsUsed.push({ partId: part._id, count: 1 });
        part.currentStock -= part.boxQuantity; // Decrement currentStock by boxQuantity
      } else {
        console.log('this part is out of stock');
        return new NextResponse('PART NOT IN STOCK', { status: 400 });
      }
    }

    await part.save(); // Save the part document after updating
    await usage.save(); // Save the updated Usage document
    return NextResponse.json('Part Usage recorded', { status: 200 });
  } catch (error) {
    console.log('Failed to POST PART USAGE:', error);
    // Respond with an error status code and message
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
