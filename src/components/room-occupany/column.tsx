import { ColumnDef } from "@tanstack/react-table"
import { RoomOccupanyType } from "./types"

export const roomOccupanyColumns: ColumnDef<RoomOccupanyType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "checked_in_time",
    header: () => <div className="">Updated At</div>,
    cell: ({ row }) => {
      const checked_in_time = new Date(row.getValue("checked_in_time"))
      return <div className="font-medium">{checked_in_time.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "expected_checkout_time",
    header: () => <div className="">Created At</div>,
    cell: ({ row }) => {
      const expected_checkout_time = new Date(row.getValue("expected_checkout_time"))
      return <div className="font-medium">{expected_checkout_time.toLocaleDateString()}</div>
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
  {
    accessorKey: "updatedAt",
    header: () => <div className="">Created At</div>,
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt"))
      return <div className="font-medium">{updatedAt.toLocaleDateString()}</div>
    },
  },
]