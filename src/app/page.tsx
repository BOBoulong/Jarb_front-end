"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DataTable } from "@/components/Datatable";
import { roomColumns } from "@/components/room/column";
import { roomTypeColumns } from "@/components/roomType/column";
import { roomOccupanyColumns } from "@/components/room-occupany/column";
import { useAuth } from "@/api";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderRoom } from "@/components/room/order-room";
import { RoomDetail } from "@/components/roomType/room-detail";
import { RoomChart } from "@/components/roomType/room-chart";
import { Button } from "@/components/ui/button";
import { AmenitiesColumns } from "@/components/amenities/column";

export function Room() {
  const { apiClient } = useAuth();

  const [roomItem, setRoomItem] = useState<[]>([]);
  const [totalRoom, setTotalRoom] = useState(0);
  const [roomSelected, setRoomSelected] = useState<any>({});
  const [roomTypeSelected, setRoomTypeSelected] = useState<any>([]);
  const [roomOccupany, setRoomOccpuany] = useState<[]>([]);

  useEffect(() => {
    getRoom();
    getRoomOccupany();
  }, []);

  useEffect(() => {
    if (roomSelected?.roomType?.id) {
      getRoomTypeByRoomId(roomSelected?.roomType?.id);
    }
  }, [roomSelected]);

  const getRoomTypeByRoomId = async (roomTypeId: any) => {
    try {
      const { data } = await apiClient.get(`/room-types/${roomTypeId}`);
      setRoomTypeSelected(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomById = async (roomId: any) => {
    try {
      const { data } = await apiClient.get(`/rooms/${roomId}`);
      setRoomSelected(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoom = async () => {
    try {
      const {
        data: { data, total },
      } = await apiClient.get(`/rooms`);
      setRoomItem(data);
      setTotalRoom(total);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomOccupany = async () => {
    try {
      const {
        data,
      } = await apiClient.get(`/room-occupancy`);
      setRoomOccpuany(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  const testingFloors = Array.from(
    new Set(roomItem.map((room: any) => String(room.floor)))
  );

  const onCreateSuccessChange = (success: any) => {
    if (success) {
      getRoom();
      getRoomOccupany();
    }
  }

  return (
    <div className="w-full h-full overflow-auto">
      <ResizablePanelGroup
        direction="vertical"
        className="w-full h-full rounded-lg border"
      >
        <ResizablePanel defaultSize={50} style={{ overflow: "auto" }}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              defaultSize={40}
              className="p-5 pl-[76px]"
              style={{ overflow: "auto" }}
            >
              <div className="min-w-[600px]">
                {testingFloors[0] && (
                  <Tabs defaultValue={testingFloors[0]}>
                    <TabsList>
                      {testingFloors.map((floor) => (
                        <TabsTrigger
                          key={floor}
                          value={floor}
                          className="text-base py-1 px-6 font-semibold"
                        >
                          <span className="text-xs pr-2 capitalize font-normal text-gray-500 rounded-md">
                            floor
                          </span>
                          {floor}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <div className="mt-4">
                      {testingFloors.map((floor) => (
                        <TabsContent
                          key={`floor_${floor}`}
                          value={floor}
                          className="grid grid-cols-6 gap-1"
                        >
                          {roomItem
                            .filter((room: any) => String(room.floor) === floor)
                            .map((room: any, index) => (
                              <Button
                                key={`room_${room.id}_${index}`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  getRoomById(room.id);
                                }}
                                variant={`${
                                  roomSelected?.id === room.id
                                    ? "secondary"
                                    : "outline"
                                }`}
                                className={`flex flex-col items-center justify-center h-[65px] text-base font-semibold`}
                              >
                                F{room.floor}-{room.id}
                                <div className="text-xs text-gray-400">
                                  {room.name}
                                </div>
                              </Button>
                            ))}
                        </TabsContent>
                      ))}
                    </div>
                  </Tabs>
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel
              defaultSize={60}
              className="p-5"
              style={{ overflow: "auto" }}
            >
              <div className="flex flex-col gap-5">
                <div className="min-w-[800px] flex gap-5">
                  <RoomDetail roomDetail={roomSelected} />
                  <div className="grow">
                    <div className="mb-5">
                      <RoomChart />
                    </div>
                    {!!roomTypeSelected?.amenities?.length && (
                      <Card>
                        <CardHeader className="bg-muted/50">
                          <CardTitle>Available Amenities</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                          <DataTable
                            className="grow self-start"
                            columns={AmenitiesColumns}
                            data={roomTypeSelected?.amenities}
                            total={roomTypeSelected?.amenities?.length || 0}
                          />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
                {!!roomOccupany?.length && (
                  <Card>
                    <CardHeader className="bg-muted/50">
                      <CardTitle>Room Occupany</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <DataTable
                        columns={roomOccupanyColumns}
                        data={roomOccupany}
                        total={roomOccupany.length}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />

        <ResizablePanel defaultSize={50} style={{ overflow: "auto" }}>
          <ResizablePanel defaultSize={33}>
            <OrderRoom
              onCreateSuccess={onCreateSuccessChange}
              roomTypeSelected={roomTypeSelected}
              roomDetail={roomSelected}
            />
          </ResizablePanel>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Room;
