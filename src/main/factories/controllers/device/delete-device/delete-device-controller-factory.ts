import { makeDbDeleteDevice } from '../../../../../main/factories/use-cases/device/delete-device/db-delete-device-factory'
import { DeleteDeviceController } from '../../../../../presentation/controllers/device/delete-device/delete-device-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeDeleteDeviceController = (): Controller => {
	return new DeleteDeviceController(makeDbDeleteDevice())
}
