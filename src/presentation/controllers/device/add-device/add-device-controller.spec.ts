import { AddDevice } from '../../../../domain/use-cases/device/add-device'
import { throwError } from '../../../../data/test/test-helper'
import { mockDeviceModel } from '../../../../domain/test/mock-device'
import { badRequest, ok, serverError } from '../../../../presentation/helpers/http/http-helper'
import { mockAddDevice, mockValidation } from '../../../../presentation/test'
import { HttpRequest, Validation } from '../../../protocols'
import { AddDeviceController } from './add-device-controller'
import mockdate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
	body: {
		name: 'any_name',
		status: 'any_status',
		description: 'any_description',
		temperature: 'any_temperature',
		humidity: 'any_humidity',
		brightness: 500,
		created_at: new Date()
	}
})

type SutTypes = {
  sut: AddDeviceController
  validationStub: Validation
  addDeviceStub: AddDevice
}

const makeSut = (): SutTypes => {
	const validationStub = mockValidation()
	const addDeviceStub = mockAddDevice()
	const sut = new AddDeviceController(validationStub, addDeviceStub)

	return {
		sut,
		validationStub,
		addDeviceStub
	}
}

describe('AddDevice Controller', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})

	it('Should call Validation with correct values', async () => {
		const { sut, validationStub } = makeSut()
		const validateSpy = jest.spyOn(validationStub, 'validate')
		const httpRequest = makeFakeRequest()
		await sut.handle(httpRequest)
		expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
	})

	it('Should return 400 with if Validation fails', async () => {
		const { sut, validationStub } = makeSut()
		jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
		const httpResponse = await sut.handle(makeFakeRequest())
		expect(httpResponse).toEqual(badRequest(new Error()))
	})

	it('Should call AddDevice with correct values', async () => {
		const { sut, addDeviceStub } = makeSut()
		const addSpy = jest.spyOn(addDeviceStub, 'add')
		const httpRequest = makeFakeRequest()
		await sut.handle(httpRequest)
		expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
	})

	it('Should return 500 if AddDevice throws', async () => {
		const { sut, addDeviceStub } = makeSut()
		jest.spyOn(addDeviceStub, 'add').mockImplementationOnce(throwError)
		const httpRequest = makeFakeRequest()
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(serverError(new Error()))
	})

	it('Should return 200 on success', async () => {
		const { sut } = makeSut()
		const httpResponse = await sut.handle(makeFakeRequest())
		expect(httpResponse).toEqual(ok(mockDeviceModel()))
	})
})
