import { DbLoadDeviceById } from '../../../../../data/use-cases/device/load-device-by-id/db-load-device-by-id'
import { DeviceMongoRepository } from '../../../../../infra/db/mongo/device/device-mongo-repository'

export const makeDbLoadDeviceById = (): DbLoadDeviceById => {
	const deviceMongoRepository = new DeviceMongoRepository()
	return new DbLoadDeviceById(deviceMongoRepository)
}
