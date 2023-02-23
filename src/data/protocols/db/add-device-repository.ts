import { AddDeviceParams } from '../../../domain/use-cases/device/add-device'

export interface AddDeviceRepository {
  add: (deviceData: AddDeviceParams) => Promise<any>
}
