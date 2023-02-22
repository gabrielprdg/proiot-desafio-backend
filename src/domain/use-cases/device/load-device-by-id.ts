import { DeviceModel } from '../../models/device'

export interface LoadDeviceById {
  loadById: (id: string) => Promise<DeviceModel>
}
