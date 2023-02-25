import { DeviceMongoRepository } from '../../../../../infra/db/mongo/device/device-mongo-repository'
import { DbUpdateDevice } from '../../../../../data/use-cases/device/update-device/db-update-device'
import { SocketIoAdapter } from '../../../../../infra/socket/socket-io-adapter'

export const makeDbUpdateDevice = (): DbUpdateDevice => {
	const deviceMongoRepository = new DeviceMongoRepository()
	const updateEmmiter = new SocketIoAdapter('update-event')
	return new DbUpdateDevice(deviceMongoRepository, updateEmmiter)
}
