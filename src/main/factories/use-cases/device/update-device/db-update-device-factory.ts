import { DeviceMongoRepository } from '../../../../../infra/db/mongo/device/device-mongo-repository'
import { DbUpdateDevice } from '../../../../../data/use-cases/device/update-device/db-update-device'

export const makeDbUpdateDevice = (): DbUpdateDevice => {
	const deviceMongoRepository = new DeviceMongoRepository()
	return new DbUpdateDevice(deviceMongoRepository)
}
