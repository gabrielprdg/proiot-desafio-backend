import { throwError } from '../../../../data/test/test-helper'
import { DeleteDevice } from '../../../../domain/use-cases/device/delete-device'
import { serverError, noContent } from '../../../../presentation/helpers/http/http-helper'
import { HttpRequest } from '../../../../presentation/protocols'
import { mockDeleteDevice } from '../../../../presentation/test'
import { DeleteDeviceController } from './delete-device-controller'
import mockdate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
	params: 'any_id'
})

type SutTypes = {
  sut: DeleteDeviceController
  deleteDeviceStub: DeleteDevice
}

const makeSut = (): SutTypes => {
	const deleteDeviceStub = mockDeleteDevice()
	const sut = new DeleteDeviceController(deleteDeviceStub)

	return {
		sut,
		deleteDeviceStub
	}
}

describe('DeleteDevice Controller', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})

	it('Should call DeleteDevice with correct values', async () => {
		const { sut, deleteDeviceStub } = makeSut()
		const deleteSpy = jest.spyOn(deleteDeviceStub, 'delete')
		const httpRequest = makeFakeRequest()
		await sut.handle(httpRequest)
		expect(deleteSpy).toHaveBeenCalledWith(httpRequest.body)
	})

	it('Should return 500 if DeleteDevice throws', async () => {
		const { sut, deleteDeviceStub } = makeSut()
		jest.spyOn(deleteDeviceStub, 'delete').mockImplementationOnce(throwError)
		const httpRequest = makeFakeRequest()
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(serverError(new Error()))
	})

	it('Should return 204 on success', async () => {
		const { sut } = makeSut()
		const httpResponse = await sut.handle(makeFakeRequest())
		expect(httpResponse).toEqual(noContent())
	})
})
