import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { BookInput } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const genre = searchParams.get('genre') || '';
    
    const client = await clientPromise;
    const db = client.db();
    
    let dbQuery: any = {};
    
    if (query) {
      dbQuery = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } },
          { isbn: { $regex: query, $options: 'i' } },
        ],
      };
    }
    
    if (genre) {
      dbQuery.genre = genre;
    }
    
    const books = await db.collection('books')
      .find(dbQuery)
      .sort({ addedAt: -1 })
      .toArray();
    
    return NextResponse.json(books);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: BookInput = await request.json();
    
    // Validate required fields
    if (!data.title || !data.author || !data.isbn || !data.genre || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db();
    
    // Check if ISBN already exists
    const existingBook = await db.collection('books').findOne({ isbn: data.isbn });
    
    if (existingBook) {
      return NextResponse.json(
        { error: 'A book with this ISBN already exists' },
        { status: 409 }
      );
    }
    
    const now = new Date();
    
    const newBook = {
      ...data,
      available: true,
      addedAt: now,
      updatedAt: now,
    };
    
    const result = await db.collection('books').insertOne(newBook);
    
    return NextResponse.json(
      { 
        _id: result.insertedId,
        ...newBook 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add book' },
      { status: 500 }
    );
  }
}