export interface UpdateDeviceRepository {
  update: (id: string, beerData: any) => Promise<void>
}
