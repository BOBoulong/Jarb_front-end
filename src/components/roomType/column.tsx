import { ColumnDef } from "@tanstack/react-table"
import { RoomType } from "./types"

export const roomTypeColumns: ColumnDef<RoomType>[] = [
  // {
  //   accessorKey: "id",
  //   header: "Id",
  // },
  // {
  //   accessorKey: "name",
  //   header: "Name",
  // },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  // {
  //   accessorKey: "capacityAdult",
  //   header: "Capacity Adult",
  // },
  // {
  //   accessorKey: "capacityChildren",
  //   header: "Capacity Children",
  // },
  {
    accessorKey: "updatedAt",
    header: () => <div className="">Updated At</div>,
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt"))
      return <div className="font-medium">{updatedAt.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="">Created At</div>,
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"))
      return <div className="font-medium">{createdAt.toLocaleDateString()}</div>
    },
  },
]