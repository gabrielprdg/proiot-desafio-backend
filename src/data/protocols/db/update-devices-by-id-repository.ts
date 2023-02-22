import { UpdateDeviceParams } from '../../../domain/use-cases/device/update-device'

export interface UpdateDeviceRepository {
  update: (id: string, beerData: UpdateDeviceParams) => Promise<void>
}
