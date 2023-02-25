import { AddDeviceRepository } from '../../../../data/protocols/db/add-device-repository'
import { mockAddDeviceRepository } from '../../../../data/test/mock-db-beer'
import { throwError } from '../../../../data/test/test-helper'
import {
	mockAddDeviceParams,
	mockDeviceModel
} from '../../../../domain/test/mock-beer'
import { DbAddDevice } from './db-add-device'
import mockdate from 'mockdate'

type SutTypes = {
  sut: DbAddDevice
  addDeviceRepositoryStub: AddDeviceRepository
}

const makeSut = (): SutTypes => {
	const addDeviceRepositoryStub = mockAddDeviceRepository()
	const sut = new DbAddDevice(addDeviceRepositoryStub)

	return {
		sut,
		addDeviceRepositoryStub
	}
}

describe('DbAddDevice Usecase', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})
	it('Should call AddDeviceRepository with correct values', async () => {
		const { sut, addDeviceRepositoryStub } = makeSut()
		const addSpy = jest.spyOn(addDeviceRepositoryStub, 'add')
		await sut.add(mockAddDeviceParams())
		expect(addSpy).toHaveBeenCalledWith(mockAddDeviceParams())
	})

	it('Should return a Device on success ', async () => {
		const { sut } = makeSut()
		const device = await sut.add(mockAddDeviceParams())
		expect(device).toEqual(mockDeviceModel())
	})

	it('Should throws if AddDeviceRepository throws', async () => {
		const { sut, addDeviceRepositoryStub } = makeSut()
		jest.spyOn(addDeviceRepositoryStub, 'add').mockImplementationOnce(throwError)

		const promise = sut.add(mockAddDeviceParams())
		// waits for the encrypt method to throw an error
		await expect(promise).rejects.toThrow()
	})
})
