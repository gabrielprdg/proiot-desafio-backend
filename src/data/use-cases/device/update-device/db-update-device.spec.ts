import { UpdateDeviceRepository } from '../../../../data/protocols/db/update-devices-by-id-repository'
import { mockUpdateDeviceRepository } from '../../../test/mock-db-device'
import { throwError } from '../../../../data/test/test-helper'
import { mockUpdateDeviceParams } from '../../../../domain/test/mock-device'
import mockdate from 'mockdate'
import { DbUpdateDevice } from './db-update-device'

type SutTypes = {
  sut: DbUpdateDevice
  updateDeviceRepositoryStub: UpdateDeviceRepository
}

const makeSut = (): SutTypes => {
	const updateDeviceRepositoryStub = mockUpdateDeviceRepository()
	const sut = new DbUpdateDevice(updateDeviceRepositoryStub)

	return {
		sut,
		updateDeviceRepositoryStub
	}
}

describe('DbUpdateDevice Usecase', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})
	it('Should call UpdateDeviceRepository with correct values', async () => {
		const { sut, updateDeviceRepositoryStub } = makeSut()
		const addSpy = jest.spyOn(updateDeviceRepositoryStub, 'update')
		await sut.update('any_id', mockUpdateDeviceParams())
		expect(addSpy).toHaveBeenCalledWith('any_id', mockUpdateDeviceParams())
	})

	it('Should throws if UpdateDeviceRepository throws', async () => {
		const { sut, updateDeviceRepositoryStub } = makeSut()
		jest.spyOn(updateDeviceRepositoryStub, 'update').mockImplementationOnce(throwError)

		const promise = sut.update('any_id', mockUpdateDeviceParams())
		// espera que o metodo encrypt lanse um erro
		await expect(promise).rejects.toThrow()
	})
})
