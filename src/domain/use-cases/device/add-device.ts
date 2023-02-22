import { DeviceModel } from '../../../domain/models/device'

export type AddDeviceParams = Omit<DeviceModel, 'id'>

export interface AddDevice {
  add: (deviceData: AddDeviceParams) => Promise<DeviceModel>
}
