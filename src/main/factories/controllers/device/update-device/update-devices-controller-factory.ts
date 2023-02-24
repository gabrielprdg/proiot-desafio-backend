import { makeDbUpdateDevice } from '../../../../../main/factories/use-cases/device/update-device/db-update-device-factory'
import { UpdateDeviceController } from '../../../../../presentation/controllers/device/update-device/update-device-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeUpdateDeviceController = (): Controller => {
	return new UpdateDeviceController(makeDbUpdateDevice())
}
