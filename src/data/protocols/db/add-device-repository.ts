import { AddDeviceParams } from '../../../domain/use-cases/device/add-device'

export interface AddDeviceRepository {
  add: (beerData: AddDeviceParams) => Promise<any>
}
