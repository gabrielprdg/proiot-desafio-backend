import { Emitter } from '../../../../data/protocols/socket/emitter'
import { UpdateDeviceRepository } from '../../../../data/protocols/db/update-devices-by-id-repository'
import { UpdateDevice, UpdateDeviceParams } from '../../../../domain/use-cases/device/update-device'

export class DbUpdateDevice implements UpdateDevice {
	private readonly updateDeviceRepository: UpdateDeviceRepository
	private readonly emitter: Emitter
	constructor (updateDeviceRepository: UpdateDeviceRepository, emitter: Emitter) {
		this.updateDeviceRepository = updateDeviceRepository
		this.emitter = emitter
	}

	async update (id: string, deviceRawData: UpdateDeviceParams): Promise<void> {
		await this.updateDeviceRepository.update(id, deviceRawData)
		this.emitter.emitEvent({ message: `Device id ${id} has been updated`, changedFields: { ...deviceRawData } })
	}
}
