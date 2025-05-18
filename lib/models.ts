import { ObjectId } from 'mongodb';

export interface Book {
  _id?: ObjectId | string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  description: string;
  coverImage: string;
  available: boolean;
  addedAt: Date;
  updatedAt: Date;
}

export interface BookInput {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  description: string;
  coverImage?: string;
  available?: boolean;
}