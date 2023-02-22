export interface DeleteDeviceRepository {
  deleteById: (id: string) => Promise<void>
}
