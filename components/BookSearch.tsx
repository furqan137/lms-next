'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function BookSearch({ 
  className 
}: { 
  className?: string 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  function handleSearch(term: string) {
    setSearchQuery(term);
    
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search books..."
        className="pl-8 w-full"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}