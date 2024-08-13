import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { DataTable } from "../Datatable";
import { AmenitiesColumns } from "../amenities/column";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/api";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner"
interface OrderRoomProps {
  roomTypeSelected?: any;
  roomDetail?: any;
  onCreateSuccess: (value: any) => any
}

export const OrderRoom: React.FC<OrderRoomProps> = ({
  roomTypeSelected = [],
  roomDetail = {},
  onCreateSuccess
}) => {
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const [archiveAmenities, setArchiveAmenities] = useState<any>([]);
  const [checkIndate, setCheckInDate] = useState<Date>();
  const [checkOutdate, setCheckOutDate] = useState<Date>();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { apiClient } = useAuth();
  const [key, setKey] = useState(0);

  const initialData = () => {
    setName('');
    setAge('');
    setGender('');
    setIdNumber('');
    setPhoneNumber('');
    setCheckInDate(undefined); // Resetting the check-in date
    setCheckOutDate(undefined); // Resetting the check-out date
    setArchiveAmenities([]);
    setSelectedRow([]);
    setKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    if (roomTypeSelected?.amenities) {
      setArchiveAmenities(roomTypeSelected.amenities);
    }
  }, [roomTypeSelected]);

  const discardItem = () => {
    initialData()
  }

  const getRowSelected = (rowData: any, isSelected: boolean) => {
    if (isSelected) {
      // Add the row to selected and remove from archive
      setSelectedRow((lastSelected: any) => [...lastSelected, rowData]);
      setArchiveAmenities((lastAmenities: any) =>
        lastAmenities.filter((row: any) => row.id !== rowData.id)
      );
    } else {
      // Remove the row from selected and add back to archive
      setSelectedRow((lastSelected: any) =>
        lastSelected.filter((row: any) => row.id !== rowData.id)
      );
      setArchiveAmenities((lastAmenities: any) => [...lastAmenities, rowData]);
    }
  };

  const getAllRowSelected = (allRowsData: any[], isSelected: boolean) => {
    if (isSelected) {
      setSelectedRow(allRowsData);
      setArchiveAmenities([]);
    } else {
      setSelectedRow([]);
      setArchiveAmenities(roomTypeSelected.amenities);
    }
  };

  const createItem = async () => {
    try {
      const { data } = await apiClient.post(`/customers`, {
        name,
        age,
        gender,
        id_number: idNumber,
        phone: phoneNumber,
      });
      await apiClient.post(`/room-occupancy`, {
        customer_id: [data?.id],
        room_id: roomDetail.id,
        amenities: selectedRow.map((amenities: any) => amenities.id),
        checked_in_time: checkIndate,
        expected_checkout_time: checkOutdate
      });
      initialData()
      onCreateSuccess(true)
      toast('Success', {
        description: 'Operation run successfully',
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={key} className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Book Room
              </h1>
              <Badge className="ml-auto sm:ml-0">Available</Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" onClick={discardItem}>
                  Discard
                </Button>
                <Button size="sm" onClick={createItem}>Save Product</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Customer Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                      <div className="grid gap-3 grid-cols-2">
                        <div>
                          <Label htmlFor="name">Age</Label>
                          <Select onValueChange={(value) => setAge(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Age" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="18">Under 18</SelectItem>
                                <SelectItem value="30">Under 30</SelectItem>
                                <SelectItem value="50">Under 50</SelectItem>
                                <SelectItem value="god">God level</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="name">Gender</Label>
                          <Select onValueChange={(value) => setGender(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="gay">Gay</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Contact information
                        </legend>
                        <div className="grid gap-3">
                          <Label htmlFor="phone_number">Phone Number</Label>
                          <Input
                            id="phone_number"
                            type="tel"
                            className="w-full"
                            onChange={(event) =>
                              setPhoneNumber(event.target.value)
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="id_number">Id Number</Label>
                          <Textarea
                            id="id_number"
                            className="w-full"
                            onChange={(event) =>
                              setIdNumber(event.target.value)
                            }
                          />
                        </div>
                      </fieldset>
                    </div>
                  </CardContent>
                </Card>
                {!!roomTypeSelected?.amenities?.length && (
                  <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                      <CardTitle>Amenities</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <DataTable
                        isSelect
                        className="grow self-start"
                        onRowSelected={getRowSelected}
                        onAllRowSelected={getAllRowSelected}
                        columns={AmenitiesColumns}
                        data={roomTypeSelected?.amenities}
                        total={roomTypeSelected?.amenities?.length || 0}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                {!!roomTypeSelected?.name && (
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Room Type Name</CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-5">
                      <div className="grid gap-6">
                        <Select disabled>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder={roomTypeSelected?.name} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Room Occupany</CardTitle>
                    <CardDescription>testing Room Occupany</CardDescription>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 flex flex-col gap-3">
                    <div className="grid gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !checkIndate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkIndate ? (
                              format(checkIndate, "PPP")
                            ) : (
                              <span>Check in date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkIndate}
                            onSelect={setCheckInDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !checkOutdate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutdate ? (
                              format(checkOutdate, "PPP")
                            ) : (
                              <span>Check out date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOutdate}
                            onSelect={setCheckOutDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardContent>
                </Card>
                {!!archiveAmenities?.length && (
                  <Card x-chunk="dashboard-07-chunk-5">
                    <CardHeader>
                      <CardTitle>Archive Amenities</CardTitle>
                      <CardDescription>
                        Archive Amenities Description test test test
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Amenities</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[700px] max-w-3xl">
                          <DialogHeader>
                            <DialogTitle className="text-lg">
                              Archive Amenities
                            </DialogTitle>
                            <DialogDescription className="text-sm">
                              Make changes to your profile here. Click save when
                              you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <Card>
                            <CardContent className="p-5">
                              <DataTable
                              isSelect={false}
                              className="grow self-start"
                              columns={JSON.parse(
                                JSON.stringify(AmenitiesColumns)
                              )}
                              data={archiveAmenities}
                              total={archiveAmenities?.length || 0}
                            />
                            </CardContent>
                          </Card>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
