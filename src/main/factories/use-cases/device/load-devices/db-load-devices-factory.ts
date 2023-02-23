import { DbLoadDevices } from '../../../../../data/use-cases/device/load-devices/db-load-devices'
import { DeviceMongoRepository } from '../../../../../infra/db/mongo/device/device-mongo-repository'

export const makeDbLoadDevices = (): DbLoadDevices => {
	const deviceMongoRepository = new DeviceMongoRepository()
	return new DbLoadDevices(deviceMongoRepository)
}
