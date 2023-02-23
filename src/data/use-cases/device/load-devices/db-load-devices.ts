import { LoadDevicesRepository } from '../../../../data/protocols/db/load-devices-repository'
import { DeviceModel } from '../../../../domain/models/device'
import { LoadDevices } from '../../../../domain/use-cases/device/load-devices'

export class DbLoadDevices implements LoadDevices {
	private readonly LoadDevicesRepository: LoadDevicesRepository
	constructor (LoadDevicesRepository: LoadDevicesRepository) {
		this.LoadDevicesRepository = LoadDevicesRepository
	}

	async loadAll (): Promise<DeviceModel[]> {
		const devices = await this.LoadDevicesRepository.loadAll()
		return devices
	}
}
