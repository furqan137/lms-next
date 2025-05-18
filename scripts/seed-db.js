// This script can be used to seed the database with sample books
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const sampleBooks = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780061120084',
    publishedYear: 1960,
    genre: 'Fiction',
    description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.',
    coverImage: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg',
    available: true,
    addedAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    publishedYear: 1949,
    genre: 'Science Fiction',
    description: 'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real.',
    coverImage: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg',
    available: true,
    addedAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    publishedYear: 1925,
    genre: 'Fiction',
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    coverImage: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg',
    available: true,
    addedAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '9780141439518',
    publishedYear: 1813,
    genre: 'Romance',
    description: 'Pride and Prejudice is an 1813 romantic novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
    coverImage: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg',
    available: false,
    addedAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    publishedYear: 1937,
    genre: 'Fantasy',
    description: 'The Hobbit, or There and Back Again is a children\'s fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.',
    coverImage: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg',
    available: true,
    addedAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Check if books collection exists and has any records
    const count = await db.collection('books').countDocuments();
    
    if (count === 0) {
      console.log('Seeding books collection...');
      const result = await db.collection('books').insertMany(sampleBooks);
      console.log(`${result.insertedCount} books were inserted`);
    } else {
      console.log(`Books collection already contains ${count} documents. Skipping seed.`);
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedDatabase();