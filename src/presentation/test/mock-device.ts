import { DeviceModel } from '../../domain/models/device'
import { mockDeviceModel, mockDevices } from '../../domain/test/mock-device'
import { AddDevice, AddDeviceParams } from '../../domain/use-cases/device/add-device'
import { DeleteDevice } from '../../domain/use-cases/device/delete-device'
import { LoadDeviceById } from '../../domain/use-cases/device/load-device-by-id'
import { LoadDevices } from '../../domain/use-cases/device/load-devices'
import { UpdateDevice, UpdateDeviceParams } from '../../domain/use-cases/device/update-device'

export const mockAddDevice = (): AddDevice => {
	class AddDeviceStub implements AddDevice {
		async add (device: AddDeviceParams): Promise<DeviceModel> {
			return await Promise.resolve(mockDeviceModel())
		}
	}

	return new AddDeviceStub()
}

export const mockLoadDeviceById = (): LoadDeviceById => {
	class LoadDeviceByIdStub implements LoadDeviceById {
		async loadById (id: string): Promise<DeviceModel> {
			return await Promise.resolve(mockDeviceModel())
		}
	}

	return new LoadDeviceByIdStub()
}

export const mockLoadDevices = (): LoadDevices => {
	class LoadDevicesStub implements LoadDevices {
		async loadAll (): Promise<DeviceModel[]> {
			return await Promise.resolve(mockDevices())
		}
	}

	return new LoadDevicesStub()
}

export const mockUpdateDevice = (): UpdateDevice => {
	class UpdateDeviceStub implements UpdateDevice {
		async update (id: string, deviceRawData: UpdateDeviceParams): Promise<void> {
			await Promise.resolve()
		}
	}

	return new UpdateDeviceStub()
}

export const mockDeleteDevice = (): DeleteDevice => {
	class DeleteDeviceStub implements DeleteDevice {
		async delete (id: string): Promise<void> {
			await Promise.resolve()
		}
	}

	return new DeleteDeviceStub()
}
