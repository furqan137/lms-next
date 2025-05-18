import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid book ID' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db();
    
    // First, get the current book data
    const book = await db.collection('books').findOne({
      _id: new ObjectId(id),
    });
    
    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }
    
    // Toggle the available status
    const newStatus = !book.available;
    
    const result = await db.collection('books').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          available: newStatus,
          updatedAt: new Date(),
        } 
      }
    );
    
    // Redirect back to the book detail page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/books/${id}`);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
  }
}