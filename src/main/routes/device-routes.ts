import { Router } from 'express'
import { makeAddDeviceController } from '../../main/factories/controllers/device/add-device/add-device-controller-factory'
import { makeDeleteDeviceController } from '../../main/factories/controllers/device/delete-device/delete-device-controller-factory'
import { makeLoadDeviceByIdController } from '../../main/factories/controllers/device/load-device-by-id/load-device-by-id-controller-factory'
import { makeLoadDevicesController } from '../../main/factories/controllers/device/load-devices/load-devices-controller-factory'
import { makeUpdateDeviceController } from '../../main/factories/controllers/device/update-device/update-devices-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
	router.post('/device', adaptRoute(makeAddDeviceController()))
	router.get('/devices', adaptRoute(makeLoadDevicesController()))
	router.get('/device/:id', adaptRoute(makeLoadDeviceByIdController()))
	router.patch('/device/:id', adaptRoute(makeUpdateDeviceController()))
	router.delete('/device/:id', adaptRoute(makeDeleteDeviceController()))
}
