import { Book } from '@/lib/models';
import BookCard from './BookCard';
import { getBooks } from '@/lib/api';

export default async function BookList({ 
  query = "", 
  genre = "" 
}: { 
  query?: string, 
  genre?: string 
}) {
  const books = await getBooks(query, genre);
  
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No books found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or add a new book</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book: Book) => (
        <BookCard key={book._id?.toString()} book={book} />
      ))}
    </div>
  );
}