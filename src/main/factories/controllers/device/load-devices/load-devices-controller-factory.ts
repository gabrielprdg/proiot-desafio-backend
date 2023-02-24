import { makeDbLoadDevices } from '../../../../../main/factories/use-cases/device/load-devices/db-load-devices-factory'
import { LoadDevicesController } from '../../../../../presentation/controllers/device/load-devices/load-devices-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeLoadDevicesController = (): Controller => {
	return new LoadDevicesController(makeDbLoadDevices())
}
