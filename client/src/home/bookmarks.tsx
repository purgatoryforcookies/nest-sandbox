import { fetchBookmarks } from '@/service/api';
import { useEffect, useState } from 'react';
import { DataTable } from '../components/table/data-table';
import { columns, Bookmark as BookmarkT } from '../components/table/columns';
import { SkeletonTable } from '../components/table/skeletonTable';

export function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkT[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await fetchBookmarks<BookmarkT[]>();
        setBookmarks(data);
      } catch (error) {
        if (error instanceof Response) {
          const b = await error.json();
          setError(b.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };
    get();
  }, []);

  return (
    <div>
      {!loading ? (
        <DataTable columns={columns} data={bookmarks} rowkey="id" />
      ) : (
        <SkeletonTable />
      )}
      {error ?? null}
    </div>
  );
}
