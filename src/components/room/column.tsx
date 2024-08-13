import { ColumnDef } from "@tanstack/react-table"
import { Room } from "./types"

export const roomColumns: ColumnDef<Room>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "floor",
    header: "Floor",
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: () => <div className="">Updated At</div>,
  //   cell: ({ row }) => {
  //     const updatedAt = new Date(row.getValue("updatedAt"))
  //     return <div className="font-medium">{updatedAt.toLocaleDateString()}</div>
  //   },
  // },
  // {
  //   accessorKey: "createdAt",
  //   header: () => <div className="">Created At</div>,
  //   cell: ({ row }) => {
  //     const createdAt = new Date(row.getValue("createdAt"))
  //     return <div className="font-medium">{createdAt.toLocaleDateString()}</div>
  //   },
  // },
]