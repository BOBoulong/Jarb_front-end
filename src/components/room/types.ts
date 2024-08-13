export type Room = {
  id: string | number
  name: string
  floor: number
  roomType: Record<string, string>
  hotel: Record<string, string>
  createdAt: string
  updateAt: string
}
