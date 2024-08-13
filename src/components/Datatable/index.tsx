import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { twMerge } from "tailwind-merge"
import { Checkbox } from "@/components/ui/checkbox"
import React, { useEffect } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  limit?: number,
  page?: number,
  total: number,
  onPageChange?: (page: number) => void,
  onLimitChange?: (limit: number) => void,
  itemPerPages?: Record<string, string>[]
  pagination?: boolean
  className?: string
  isSelect?: boolean
  onRowSelected?: (value: any, isSelected: boolean) => void
  onAllRowSelected?: (value: any, isSelected: boolean) => void
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  limit = 10,
  page = 1,
  total,
  onPageChange,
  onLimitChange,
  className,
  pagination = false,
  isSelect = false,
  onRowSelected,
  onAllRowSelected,
  itemPerPages = [{ value: '1', label: '1' }]
}: DataTableProps<TData, TValue>) => {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const onChangePagination = (currentPage: number, arrow = 'next') => {
    if (page === 1 && arrow === 'previous') return
    if ((page * Number(limit)) >= total && arrow === 'next') return
    if (currentPage) onPageChange(currentPage)
  }

  const filterColumn: ColumnDef<any, any>[] = columns

  if (isSelect) {
    const checkBox: ColumnDef<any> = {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => selectAllRow(table, !!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => filterRow(row, !!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }

    if(!filterColumn.find((column) => column.id === 'select')?.id) {
      filterColumn.unshift(checkBox)
    }
  }

  const selectAllRow = (tableRow: any, value: any) => {
    const selectedRows = table.getRowModel().rows;
    const selectedData = selectedRows.map((row: any) => row.original);

    onAllRowSelected(selectedData, value);
    return tableRow.toggleAllPageRowsSelected(value)
  }

  const filterRow = (row: any, value: boolean) => {
    if (value) {
      row.toggleSelected(true);
      onRowSelected(row.original, true);
    } else {
      row.toggleSelected(false);
      onRowSelected(row.original, false);
    }
  };


  return (
    <div className={twMerge("rounded-md", className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={row.getIsSelected() ? "hover:bg-none" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={`${row.id}-${cell.id}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      { pagination && <Pagination>
        <PaginationContent>
          <PaginationPrevious onClick={() => onChangePagination(page - 1, 'previous')} />
        </PaginationContent>

        <Select onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Item Per Page" />
          </SelectTrigger>
          <SelectContent>
            { itemPerPages.map(itemPerPage => (
                <SelectItem key={itemPerPage.label} value={itemPerPage.value}>{itemPerPage.label}</SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <PaginationContent>
          <PaginationNext onClick={() => onChangePagination(page + 1, 'next')} />
        </PaginationContent>
      </Pagination> }

    </div>
  )
}
