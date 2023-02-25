import { DeleteDeviceRepository } from '../../../../data/protocols/db/delete-device-by-id-repository'
import { mockDeleteDeviceRepository } from '../../../test/mock-db-device'
import { throwError } from '../../../../data/test/test-helper'
import { DbDeleteDevice } from './db-delete-device'
import mockdate from 'mockdate'

type SutTypes = {
  sut: DbDeleteDevice
  deleteDeviceRepositoryStub: DeleteDeviceRepository
}

// Sut -> System Under Test
const makeSut = (): SutTypes => {
	const deleteDeviceRepositoryStub = mockDeleteDeviceRepository()
	const sut = new DbDeleteDevice(deleteDeviceRepositoryStub)

	return {
		sut,
		deleteDeviceRepositoryStub
	}
}

describe('DbDeleteDevice Usecase', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})
	it('Should call DeleteDeviceRepository with correct values', async () => {
		const { sut, deleteDeviceRepositoryStub } = makeSut()
		const addSpy = jest.spyOn(deleteDeviceRepositoryStub, 'deleteById')
		await sut.delete('any_id')
		expect(addSpy).toHaveBeenCalledWith('any_id')
	})

	it('Should throws if DeleteDeviceRepository throws', async () => {
		const { sut, deleteDeviceRepositoryStub } = makeSut()
		jest.spyOn(deleteDeviceRepositoryStub, 'deleteById').mockImplementationOnce(throwError)

		const promise = sut.delete('any_id')
		// espera que o metodo encrypt lanse um erro
		await expect(promise).rejects.toThrow()
	})
})
