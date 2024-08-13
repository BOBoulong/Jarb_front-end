import { ColumnDef } from "@tanstack/react-table"
import { Amenities } from "./types"

export const AmenitiesColumns: ColumnDef<Amenities>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "hasExtraCharge",
    header: "Extra Charge",
  },
  {
    accessorKey: "group",
    header: "Group",
  },
]