import { makeDbAddDevice } from '../../../../../main/factories/use-cases/device/add-device/db-add-device-factory'
import { AddDeviceController } from '../../../../../presentation/controllers/device/add-device/add-device-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeAddDeviceValidation } from './add-device-validation-factory'

export const makeAddDeviceController = (): Controller => {
	return new AddDeviceController(makeAddDeviceValidation(), makeDbAddDevice())
}
