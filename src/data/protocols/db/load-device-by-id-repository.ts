export interface LoadDeviceByIdRepository {
  loadById: (id: string) => Promise<any>
}
