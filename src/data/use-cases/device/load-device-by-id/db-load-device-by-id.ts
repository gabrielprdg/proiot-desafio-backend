import { LoadDeviceByIdRepository } from '../../../../data/protocols/db/load-device-by-id-repository'
import { DeviceModel } from '../../../../domain/models/device'
import { LoadDeviceById } from '../../../../domain/use-cases/device/load-device-by-id'

export class DbLoadDeviceById implements LoadDeviceById {
	private readonly loadDeviceByIdRepository: LoadDeviceByIdRepository
	constructor (loadDeviceByIdRepository: LoadDeviceByIdRepository) {
		this.loadDeviceByIdRepository = loadDeviceByIdRepository
	}

	async loadById (id: string): Promise<DeviceModel> {
		const device = await this.loadDeviceByIdRepository.loadById(id)
		return device
	}
}
