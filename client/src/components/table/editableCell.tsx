import { Row, Table } from '@tanstack/react-table';
import { useState } from 'react';
import { Input } from '../ui/input';
import { editBookmark } from '@/service/api';

type EditCellProps<T> = {
  row: Row<T>;
  table: Table<T>;
  accessor: string;
  hyperlink?: boolean;
};

export function EditableCell<T>({
  row,
  table,
  accessor,
  hyperlink,
}: EditCellProps<T>) {
  const data = row.getValue(accessor) as string;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data);
  const [_loading, setLoading] = useState(false);
  const [_error, setError] = useState('');

  const meta = table.options.meta;

  const handleEditMode = () => {
    setIsEditing(true);
    setValue(data);
  };

  const handleBlur = async () => {
    if (data === value) {
      setIsEditing(false);
      return;
    }
    setLoading(true);
    const newRow = { ...row.original, [accessor]: value };
    try {
      const id = row.getValue('id');
      if (typeof id !== 'number') {
        return;
      }
      const returnedRow = await editBookmark<T>(id, newRow);
      meta?.editRow(id, returnedRow);
    } catch (error) {
      if (error instanceof Response) {
        const b = await error.json();
        setError(b.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <div onDoubleClick={handleEditMode} onBlur={handleBlur}>
      {isEditing ? (
        <Input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-5 font-sm"
        />
      ) : (
        <div className="min-h-3 w-full">
          {hyperlink && data.length > 0 ? (
            <a href={data} target="_blank" className="hover:underline">
              {data}
            </a>
          ) : (
            <p>{data}</p>
          )}
        </div>
      )}
    </div>
  );
}
