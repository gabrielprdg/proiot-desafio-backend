import { DeviceModel } from '../../../domain/models/device'

export interface LoadDevicesRepository {
  loadAll: () => Promise<DeviceModel[]>
}
