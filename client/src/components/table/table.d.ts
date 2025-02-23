import { type TableMeta } from '@tanstack/react-table';
import { type TableOptions } from './base';

declare module '@tanstack/table-core' {
  export interface TableMeta<TData extends RowData> {
    /**
     * Deletes a row from table optimitically
     */
    deleteRow: (id: keyof T) => void;
    /**
     * Replaces contents of the row with a new data.
     */
    editRow: (id: number, row: T) => void;
  }
}
