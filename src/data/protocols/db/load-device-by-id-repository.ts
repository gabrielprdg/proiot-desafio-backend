import { DeviceModel } from '../../../domain/models/device'

export interface LoadDeviceByIdRepository {
  loadById: (id: string) => Promise<DeviceModel>
}
