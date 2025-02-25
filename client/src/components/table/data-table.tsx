import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { addbookmark } from '@/service/api';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowkey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowkey,
}: DataTableProps<TData, TValue>) {
  const [initialData, setData] = useState(data);
  const [error, setError] = useState('');

  useEffect(() => {
    setData(data);
  }, [data, columns]);

  const table = useReactTable({
    data: initialData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      deleteRow: (id) => {
        const newData = [...initialData];
        const filtered = newData.filter(
          (row) => row?.[rowkey as keyof TData] !== id,
        );
        setData(filtered);
      },
      editRow: (id, newRow) => {
        const newData = [...initialData];
        const newRows = newData.map((r) => {
          if (r?.['id' as keyof TData] === id) {
            return newRow;
          }
          return r;
        });
        setData(newRows);
      },
    },
  });

  const addNewRow = async () => {
    try {
      const newRow = await addbookmark<TData>();
      const newData = [...initialData];
      newData.push(newRow);
      setData(newData);
    } catch (error) {
      if (error instanceof Response) {
        const b = await error.json();
        setError(b.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        <p className="text-center py-3 text-primary/70">Bookmarks</p>
        <div className="h-[50vh] relative overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: `${cell.column.getSize()}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="w-full flex justify-end items-center">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button size={'sm'} variant={'link'} onClick={addNewRow}>
          Add new
        </Button>
      </div>
    </div>
  );
}
