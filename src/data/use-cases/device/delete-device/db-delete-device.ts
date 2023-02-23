import { DeleteDeviceRepository } from '../../../../data/protocols/db/delete-device-by-id-repository'
import { DeleteDevice } from '../../../../domain/use-cases/device/delete-device'

export class DbDeleteDevice implements DeleteDevice {
	private readonly deleteDeviceRepository: DeleteDeviceRepository
	constructor (deleteDeviceRepository: DeleteDeviceRepository) {
		this.deleteDeviceRepository = deleteDeviceRepository
	}

	async delete (id: string): Promise<void> {
		await this.deleteDeviceRepository.deleteById(id)
	}
}
