import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface RoomDetailProps {
  roomDetail?: any,
}

export const RoomDetail: React.FC<RoomDetailProps> = ({
  roomDetail = {}
}) => {

  return (
    <>
      { !!Object.keys(roomDetail).length && (<Card className="shrink-0 w-[350px] self-start" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <CardTitle>
            Room Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Hotel Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Hotel name
                </span>
                <span>{ roomDetail.hotel.name }</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Room name</span>
                <span>{ roomDetail.name }</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Floor</span>
                <span>{ roomDetail.floor }</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Room Created At</span>
                <span>{ new Date(roomDetail.createdAt).toLocaleDateString() }</span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Room Type</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Name</dt>
                <dd>{ roomDetail?.roomType?.name }</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Description</dt>
                <dd>
                  { roomDetail?.roomType?.description || "N/A" }
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Children Capacity</dt>
                <dd>
                  { roomDetail?.roomType?.capacityChildren }
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Adult Capacity</dt>
                <dd>
                  { roomDetail?.roomType?.capacityAdult }
                </dd>
              </div>
            </dl>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Payment Information</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Visa
                </dt>
                <dd>N/A</dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated { new Date(roomDetail.updatedAt).toLocaleDateString() }
          </div>
        </CardFooter>
      </Card>)
    }
    </>
  );
};
