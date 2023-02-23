import { AddDeviceRepository } from '../../../../data/protocols/db/add-device-repository'
import { ObjectId } from 'mongodb'
import { mongoHelper } from '../helper/mongo-helper'
import { LoadDevicesRepository } from '../../../../data/protocols/db/load-devices-repository'
import { LoadDeviceByIdRepository } from '../../../../data/protocols/db/load-device-by-id-repository'
import { UpdateDeviceRepository } from '../../../../data/protocols/db/update-devices-by-id-repository'
import { DeleteDeviceRepository } from '../../../../data/protocols/db/delete-device-by-id-repository'
import { DeviceModel } from '../../../../domain/models/device'

export class DeviceMongoRepository implements AddDeviceRepository, LoadDevicesRepository, LoadDeviceByIdRepository, UpdateDeviceRepository, DeleteDeviceRepository {
	async add (deviceData: any): Promise<any> {
		const deviceCollection = await mongoHelper.getCollection('device')
		const result = await deviceCollection.insertOne(deviceData)
		const insertedId = result.insertedId
		const device = await deviceCollection.findOne({ _id: insertedId })
		return mongoHelper.map(device)
	}

	async loadAll (): Promise<DeviceModel[]> {
		const deviceCollection = await mongoHelper.getCollection('device')
		const devices = await deviceCollection.find().toArray()
		return mongoHelper.mapCollection(devices)
	}

	async loadById (id: string): Promise<DeviceModel> {
		const deviceCollection = await mongoHelper.getCollection('device')
		const device = await deviceCollection.findOne({ _id: new ObjectId(id) })
		return device && mongoHelper.map(device)
	}

	async update (id: string, deviceData: any): Promise<void> {
		const deviceCollection = await mongoHelper.getCollection('device')
		await deviceCollection.updateOne({ _id: new ObjectId(id) }, { $set: deviceData })
	}

	async deleteById (id: string): Promise<void> {
		const deviceCollection = await mongoHelper.getCollection('device')
		await deviceCollection.deleteOne({ _id: new ObjectId(id) })
	}
}
