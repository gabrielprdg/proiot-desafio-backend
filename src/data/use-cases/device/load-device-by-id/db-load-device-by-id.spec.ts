import { LoadDeviceByIdRepository } from '../../../../data/protocols/db/load-device-by-id-repository'
import { mockLoadDeviceByIdRepository } from '../../../../data/test/mock-db-beer'
import { throwError } from '../../../../data/test/test-helper'
import { mockDeviceModel } from '../../../../domain/test/mock-beer'
import mockdate from 'mockdate'
import { DbLoadDeviceById } from './db-load-device-by-id'

type SutTypes = {
  sut: DbLoadDeviceById
  LoadDeviceByIdRepositoryStub: LoadDeviceByIdRepository
}

const makeSut = (): SutTypes => {
	const LoadDeviceByIdRepositoryStub = mockLoadDeviceByIdRepository()
	const sut = new DbLoadDeviceById(LoadDeviceByIdRepositoryStub)

	return {
		sut,
		LoadDeviceByIdRepositoryStub
	}
}

describe('DbLoadDeviceById Usecase', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})
	test('Should call LoadDeviceByIdRepository with correct values', async () => {
		const { sut, LoadDeviceByIdRepositoryStub } = makeSut()
		const addSpy = jest.spyOn(LoadDeviceByIdRepositoryStub, 'loadById')
		await sut.loadById('any_id')
		expect(addSpy).toHaveBeenCalledWith('any_id')
	})

	test('Should return a Device on success ', async () => {
		const { sut } = makeSut()
		const Device = await sut.loadById('any_id')
		expect(Device).toEqual(mockDeviceModel())
	})

	test('Should throws if LoadDeviceByIdRepository throws', async () => {
		const { sut, LoadDeviceByIdRepositoryStub } = makeSut()
		jest.spyOn(LoadDeviceByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)

		const promise = sut.loadById('any_id')
		await expect(promise).rejects.toThrow()
	})
})
