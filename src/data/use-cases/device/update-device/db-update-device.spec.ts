import { UpdateDeviceRepository } from '../../../../data/protocols/db/update-devices-by-id-repository'
import { mockUpdateDeviceRepository } from '../../../test/mock-db-device'
import { throwError } from '../../../../data/test/test-helper'
import { mockUpdateDeviceParams } from '../../../../domain/test/mock-device'
import mockdate from 'mockdate'
import { DbUpdateDevice } from './db-update-device'
import { mockEmitter } from '../../../../data/test/mock-emitter'
import { Emitter } from '../../../../data/protocols/socket/emitter'

type SutTypes = {
  sut: DbUpdateDevice
  updateDeviceRepositoryStub: UpdateDeviceRepository
  emitterStub: Emitter
}

const makeSut = (): SutTypes => {
	const updateDeviceRepositoryStub = mockUpdateDeviceRepository()
	const emitterStub = mockEmitter()
	const sut = new DbUpdateDevice(updateDeviceRepositoryStub, emitterStub)

	return {
		sut,
		updateDeviceRepositoryStub,
		emitterStub
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

	it('Should throws if Emitter throws', async () => {
		const { sut, emitterStub } = makeSut()
		jest.spyOn(emitterStub, 'emitEvent').mockImplementationOnce(throwError)

		const promise = sut.update('any_id', mockUpdateDeviceParams())
		await expect(promise).rejects.toThrow()
	})

	test('Should call Emitter with correct data', async () => {
		const { sut, emitterStub } = makeSut()
		const emitterSpy = jest.spyOn(emitterStub, 'emitEvent')

		await sut.update('any_id', mockUpdateDeviceParams())
		expect(emitterSpy).toHaveBeenCalledWith({
			message: 'Device id any_id has been updated',
			changedFields: {
				name: 'any_name_2',
				status: 'any_status_2',
				description: 'any_description_2'
			}
		})
	})

	it('Should throws if UpdateDeviceRepository throws', async () => {
		const { sut, updateDeviceRepositoryStub } = makeSut()
		jest.spyOn(updateDeviceRepositoryStub, 'update').mockImplementationOnce(throwError)

		const promise = sut.update('any_id', mockUpdateDeviceParams())
		// espera que o metodo encrypt lanse um erro
		await expect(promise).rejects.toThrow()
	})
})
