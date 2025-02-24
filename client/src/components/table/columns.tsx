import { deleteBookmark } from '@/service/api';
import { ColumnDef } from '@tanstack/react-table';
import { LoaderIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { EditableCell } from './editableCell';

export type Bookmark = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  link: string;
  user_id: number;
};

export const columns: ColumnDef<Bookmark>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    size: 100,
    cell: ({ row, table }) => (
      <EditableCell row={row} table={table} accessor="title" />
    ),
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row, table }) => (
      <EditableCell row={row} table={table} accessor="link" hyperlink />
    ),
  },
  {
    accessorKey: 'description',
    header: 'Notes',
    size: 200,
    cell: ({ row, table }) => (
      <EditableCell row={row} table={table} accessor="description" />
    ),
  },
  {
    id: 'actions',
    size: 100,
    cell: ({ row, table }) => {
      const meta = table.options.meta;

      const [err, setErr] = useState('');
      const [loading, setLoading] = useState(false);

      const handleClick = async () => {
        if (loading || err.length > 0) {
          return;
        }
        setLoading(true);
        const toDeleteId = row.getValue('id');
        if (typeof toDeleteId !== 'number') {
          return;
        }
        try {
          await deleteBookmark(toDeleteId);
          setTimeout(() => {
            setLoading(false);
            meta?.deleteRow(toDeleteId);
          }, 300);
        } catch (error) {
          if (error instanceof Response) {
            const b = await error.json();
            setErr(b.message);
          } else {
            setErr('Something went wrong');
          }
        }

        setTimeout(() => {
          setErr('');
        }, 2000);
      };

      return (
        <div className="flex justify-end gap-2 items-center pr-5">
          {!loading && err ? <p>Error</p> : null}
          {loading ? (
            <LoaderIcon className="animate-spin" size={15} />
          ) : (
            <Trash2Icon size={15} onClick={handleClick} />
          )}
        </div>
      );
    },
  },
];
