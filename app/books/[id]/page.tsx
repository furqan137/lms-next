import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBookById } from '@/lib/api';
import { ChevronLeft, BookOpen, Calendar, User, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';

export default async function BookDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const book = await getBookById(params.id);
  
  if (!book) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to library
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-md">
            <Image
              src={book.coverImage || 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg'}
              alt={book.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
          
          <div className="mt-4 space-y-3">
            <Badge variant={book.available ? "outline" : "destructive"} className="w-full justify-center py-1.5">
              {book.available ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div>
            <Badge variant="outline" className="mb-3">
              {book.genre}
            </Badge>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-xl text-muted-foreground mt-1">{book.author}</p>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">ISBN: {book.isbn}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Published: {book.publishedYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Added: {formatDate(book.addedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">ID: {book._id?.toString().slice(-8)}</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <div className="prose prose-sm max-w-none">
              <p>{book.description}</p>
            </div>
          </div>
          
          <div className="pt-4 flex gap-3">
            <Link 
              href={`/books/${book._id}/edit`}
              className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors"
            >
              Edit Book
            </Link>
            <Link 
              href={`/api/books/${book._id}/toggle`}
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
            >
              {book.available ? 'Mark as Unavailable' : 'Mark as Available'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}