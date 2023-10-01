import connectDb from '@/lib/connectDb';
import Part from '@/models/Part';

import { NextResponse } from "next/server";

export async function GET() {
  await connectDb();
  const parts = await Part.find();
  console.log(parts);
  return NextResponse.json({ parts });
}
