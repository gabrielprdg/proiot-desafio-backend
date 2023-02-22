import { AddDeviceRepository } from '../../../../data/protocols/db/add-device-repository'
import { ObjectId } from 'mongodb'
import { mongoHelper } from '../helper/mongo-helper'
import { LoadDevicesRepository } from '../../../../data/protocols/db/load-devices-repository'
import { LoadDeviceByIdRepository } from '../../../../data/protocols/db/load-device-by-id-repository'
import { UpdateDeviceRepository } from '../../../../data/protocols/db/update-devices-by-id-repository'
import { DeleteDeviceRepository } from '../../../../data/protocols/db/delete-device-by-id-repository'

export class BeerMongoRepository implements AddDeviceRepository, LoadDevicesRepository, LoadDeviceByIdRepository, UpdateDeviceRepository, DeleteDeviceRepository {
	async add (beerData: any): Promise<any> {
		const beerCollection = await mongoHelper.getCollection('beer')
		const result = await beerCollection.insertOne(beerData)
		const insertedId = result.insertedId
		const beer = await beerCollection.findOne({ _id: insertedId })
		return mongoHelper.map(beer)
	}

	async loadAll (): Promise<any[]> {
		const beerCollection = await mongoHelper.getCollection('beer')
		const beers = await beerCollection.find().toArray()
		return mongoHelper.mapCollection(beers)
	}

	async loadById (id: string): Promise<any> {
		const beerCollection = await mongoHelper.getCollection('beer')
		const beer = await beerCollection.findOne({ _id: new ObjectId(id) })
		return beer && mongoHelper.map(beer)
	}

	async update (id: string, beerData: any): Promise<void> {
		const beerCollection = await mongoHelper.getCollection('beer')
		await beerCollection.updateOne({ _id: new ObjectId(id) }, { $set: beerData })
	}

	async deleteById (id: string): Promise<void> {
		const beerCollection = await mongoHelper.getCollection('beer')
		await beerCollection.deleteOne({ _id: new ObjectId(id) })
	}
}
