import { AddDeviceRepository } from '../protocols/db/add-device-repository'
import { DeleteDeviceRepository } from '../protocols/db/delete-device-by-id-repository'
import { LoadDeviceByIdRepository } from '../protocols/db/load-device-by-id-repository'
import { LoadDevicesRepository } from '../protocols/db/load-devices-repository'
import { UpdateDeviceRepository } from '../protocols/db/update-devices-by-id-repository'
import { DeviceModel } from '../../domain/models/device'
import { mockDeviceModel, mockDevices } from '../../domain/test/mock-device'
import { AddDeviceParams } from '../../domain/use-cases/device/add-device'
import { UpdateDeviceParams } from '../../domain/use-cases/device/update-device'

export const mockAddDeviceRepository = (): AddDeviceRepository => {
	class AddDeviceRepositoryStub implements AddDeviceRepository {
		async add (device: AddDeviceParams): Promise<DeviceModel> {
			return Promise.resolve(mockDeviceModel())
		}
	}

	return new AddDeviceRepositoryStub()
}

export const mockLoadDevicesRepository = (): LoadDevicesRepository => {
	class LoadDevicesRepositoryStub implements LoadDevicesRepository {
		async loadAll (): Promise<DeviceModel[]> {
			return Promise.resolve(mockDevices())
		}
	}

	return new LoadDevicesRepositoryStub()
}

export const mockDeleteDeviceRepository = (): DeleteDeviceRepository => {
	class DeleteDeviceRepositoryStub implements DeleteDeviceRepository {
		async deleteById (id: string): Promise<void> {
			return Promise.resolve()
		}
	}

	return new DeleteDeviceRepositoryStub()
}

export const mockLoadDeviceByIdRepository = (): LoadDeviceByIdRepository => {
	class LoadDeviceByIdRepositoryStub implements LoadDeviceByIdRepository {
		async loadById (id: string): Promise<DeviceModel> {
			return Promise.resolve(mockDeviceModel())
		}
	}

	return new LoadDeviceByIdRepositoryStub()
}

export const mockUpdateDeviceRepository = (): UpdateDeviceRepository => {
	class UpdateDeviceRepositoryStub implements UpdateDeviceRepository {
		async update (id: string, deviceData: UpdateDeviceParams): Promise<void> {
			return Promise.resolve()
		}
	}

	return new UpdateDeviceRepositoryStub()
}
