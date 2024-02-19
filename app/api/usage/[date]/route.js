import Usage from '@/models/Usage';
import { NextResponse } from 'next/server';
import connectDb from '../../../../lib/connectDB';

// GET usage by date
export async function GET(request) {

//export const GET = async (request) => {
  //const { date } = req.query;
  const date = request.url.split('usage/')[1];
  //console.log('SHIT FUCK '+ date);

    try {
        await connectDb();
        const usageData = await
        Usage
        .findOne({ date: new Date(date) })
        .populate('partsUsed.partId');
      //console.log(usageData);
      return NextResponse.json(usageData, {status: 200});
    } catch (error) {
      console.log(error);
        return new NextResponse('Internal Server Error',{ status: 500});
    }
};
