import { makeDbLoadDeviceById } from '../../../../../main/factories/use-cases/device/load-device-by-id/db-load-device-by-id-factory'
import { LoadDeviceByIdController } from '../../../../../presentation/controllers/device/load-device-by-id/load-device-by-id-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeLoadDeviceByIdController = (): Controller => {
	return new LoadDeviceByIdController(makeDbLoadDeviceById())
}
