import { DeviceModel } from '../../models/device'

export interface LoadDevices {
  loadAll: () => Promise<DeviceModel[]>
}
