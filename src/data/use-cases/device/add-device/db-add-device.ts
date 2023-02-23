import { AddDeviceRepository } from '../../../../data/protocols/db/add-device-repository'
import { DeviceModel } from '../../../../domain/models/device'
import { AddDevice, AddDeviceParams } from '../../../../domain/use-cases/device/add-device'

export class DbAddDevice implements AddDevice {
	private readonly addDeviceRepository: AddDeviceRepository
	constructor (addDeviceRepository: AddDeviceRepository) {
		this.addDeviceRepository = addDeviceRepository
	}

	async add (DeviceData: AddDeviceParams): Promise<DeviceModel> {
		const device = await this.addDeviceRepository.add(DeviceData)
		return device
	}
}
