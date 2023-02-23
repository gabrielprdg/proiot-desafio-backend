import { UpdateDeviceRepository } from '../../../../data/protocols/db/update-devices-by-id-repository'
import { UpdateDevice, UpdateDeviceParams } from '../../../../domain/use-cases/device/update-device'

export class DbUpdateDevice implements UpdateDevice {
	private readonly updateDeviceRepository: UpdateDeviceRepository
	constructor (updateDeviceRepository: UpdateDeviceRepository) {
		this.updateDeviceRepository = updateDeviceRepository
	}

	async update (id: string, DeviceRawData: UpdateDeviceParams): Promise<void> {
		await this.updateDeviceRepository.update(id, DeviceRawData)
	}
}
