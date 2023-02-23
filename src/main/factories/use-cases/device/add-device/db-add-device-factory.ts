import { DeviceMongoRepository } from '../../../../../infra/db/mongo/device/device-mongo-repository'
import { DbAddDevice } from '../../../../../data/use-cases/device/add-device/db-add-device'

export const makeDbAddDevice = (): DbAddDevice => {
	const deviceMongoRepository = new DeviceMongoRepository()
	return new DbAddDevice(deviceMongoRepository)
}
