import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/lib/models';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book._id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
          <Image
            src={book.coverImage || 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg'}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!book.available && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Unavailable
            </Badge>
          )}
        </div>
        <CardContent className="flex-1 pt-4">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">{book.title}</h3>
          <p className="text-muted-foreground text-sm mb-2">{book.author}</p>
          <Badge variant="outline" className="mt-1">
            {book.genre}
          </Badge>
        </CardContent>
        <CardFooter className="border-t px-6 py-3 text-sm text-muted-foreground">
          {book.publishedYear}
        </CardFooter>
      </Card>
    </Link>
  );
}