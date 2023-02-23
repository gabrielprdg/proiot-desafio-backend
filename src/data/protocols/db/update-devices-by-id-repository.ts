import { UpdateDeviceParams } from '../../../domain/use-cases/device/update-device'

export interface UpdateDeviceRepository {
  update: (id: string, deviceData: UpdateDeviceParams) => Promise<void>
}
