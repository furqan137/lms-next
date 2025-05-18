import { cache } from 'react';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { Book } from '@/lib/models';

export const getBooks = cache(async (query = '', genre = '') => {
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
  
  return books as Book[];
});

export const getBookById = cache(async (id: string) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  
  const client = await clientPromise;
  const db = client.db();
  
  const book = await db.collection('books').findOne({
    _id: new ObjectId(id),
  });
  
  return book as Book | null;
});