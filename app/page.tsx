import Link from 'next/link';
import { Suspense } from 'react';
import BookList from '@/components/BookList';
import { BookSearch } from '@/components/BookSearch';
import { PlusCircle } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Management System</h1>
          <p className="text-muted-foreground mt-1">Browse and manage your book collection</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <BookSearch className="w-full md:w-auto" />
          <Link 
            href="/books/add" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <PlusCircle size={18} />
            <span>Add Book</span>
          </Link>
        </div>
      </div>
      
      <Suspense fallback={<div className="flex justify-center py-20">Loading books...</div>}>
        <BookList />
      </Suspense>
    </main>
  );
}