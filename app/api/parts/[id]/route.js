import connectDb from '@/lib/connectDb';
import Part from '@/models/Part';
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET part by id
export const GET = async (request) => {
  const session = await getServerSession(authOptions);
  const partId = request.url.split('parts/')[1];

  if (!session || !session.user) {
    return new NextResponse('not logged in.');
  }
   
  try {
    await connectDb();
    const part = await Part.findOne({ _id: partId});
    //console.log(part);

    return NextResponse.json({ part, name: session?.user?.name ?? 'not logged in' });
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

export const PUT = async (req, res) => {
  try {
    await connectDb(); // Ensure database connection
    // parse req.body to json
    const partId = req.url.split('parts/')[1];
    const body = await req.body.getReader().read().then(({ value, done }) => {
      return new TextDecoder().decode(value);
    });
    const data = JSON.parse(body);
    const { name, size, barCodeId, initialStock, boxQuantity,currentStock } = data;
    console.log(data);

    // Create a new document in the 'parts' collection
    const updatedPart = await Part.findByIdAndUpdate(partId, {
        name,
        size,
        barCodeId,
        initialStock,
        boxQuantity,
        currentStock,
      }, { new: true });

    console.log(updatedPart);

    if (!updatedPart) {
      return new NextResponse('Part not found ', { status: 404 });
      }

    // Successfully created the new part
    return NextResponse.json('part added',{ status:200, part: updatedPart });
  } catch (error) {
    console.error('Failed to update part:', error);
    return new NextResponse('Internal Server Error', { status: 500});
  }
};

