import { LoadDevicesRepository } from '../../../../data/protocols/db/load-devices-repository'
import { mockLoadDevicesRepository } from '../../../test/mock-db-device'
import { throwError } from '../../../../data/test/test-helper'
import { mockDevices } from '../../../../domain/test/mock-device'
import mockdate from 'mockdate'
import { DbLoadDevices } from './db-load-devices'

type SutTypes = {
  sut: DbLoadDevices
  LoadDevicesRepositoryStub: LoadDevicesRepository
}

const makeSut = (): SutTypes => {
	const LoadDevicesRepositoryStub = mockLoadDevicesRepository()
	const sut = new DbLoadDevices(LoadDevicesRepositoryStub)

	return {
		sut,
		LoadDevicesRepositoryStub
	}
}

describe('DbLoadDevices Usecase', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})
	it('Should call LoadDevicesRepository with correct values', async () => {
		const { sut, LoadDevicesRepositoryStub } = makeSut()
		const addSpy = jest.spyOn(LoadDevicesRepositoryStub, 'loadAll')
		await sut.loadAll()
		expect(addSpy).toHaveBeenCalledWith()
	})

	it('Should return a list of Devices on success ', async () => {
		const { sut } = makeSut()
		const Devices = await sut.loadAll()
		expect(Devices).toEqual(mockDevices())
	})

	it('Should throws if LoadDevicesRepository throws', async () => {
		const { sut, LoadDevicesRepositoryStub } = makeSut()
		jest.spyOn(LoadDevicesRepositoryStub, 'loadAll').mockImplementationOnce(throwError)

		const promise = sut.loadAll()
		// espera que o metodo encrypt lanse um erro
		await expect(promise).rejects.toThrow()
	})
})
