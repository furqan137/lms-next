import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import AddBookForm from '@/components/AddBookForm';

export default function AddBookPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to library
      </Link>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
        <AddBookForm />
      </div>
    </main>
  );
}