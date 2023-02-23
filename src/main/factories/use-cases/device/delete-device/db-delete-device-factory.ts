import { DeviceMongoRepository } from '../../../../../infra/db/mongo/device/device-mongo-repository'
import { DbDeleteDevice } from '../../../../../data/use-cases/device/delete-device/db-delete-device'

export const makeDbDeleteDevice = (): DbDeleteDevice => {
	const deviceMongoRepository = new DeviceMongoRepository()
	return new DbDeleteDevice(deviceMongoRepository)
}
