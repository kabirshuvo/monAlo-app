import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: '✅ DB Connected' });
  } catch (error) {
    return NextResponse.json({ error: '❌ DB Connection failed' }, { status: 500 });
  }
}
