import { throwError } from '../../../../data/test/test-helper'
import { UpdateDevice } from '../../../../domain/use-cases/device/update-device'
import { noContent, serverError } from '../../../../presentation/helpers/http/http-helper'
import { HttpRequest } from '../../../../presentation/protocols'
import { mockUpdateDevice } from '../../../../presentation/test'
import { UpdateDeviceController } from './update-device-controller'
import mockdate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
	params: 'any_id',
	body: {
		name: 'other_name',
		state: 'other_state'
	}
})

type SutTypes = {
  sut: UpdateDeviceController
  updateDeviceStub: UpdateDevice
}

const makeSut = (): SutTypes => {
	const updateDeviceStub = mockUpdateDevice()
	const sut = new UpdateDeviceController(updateDeviceStub)

	return {
		updateDeviceStub,
		sut
	}
}

describe('UpdateDevice Controller', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})
	test('Should call UpdateDevice', async () => {
		const { sut, updateDeviceStub } = makeSut()
		const updateSpy = jest.spyOn(updateDeviceStub, 'update')
		await sut.handle(makeFakeRequest())
		expect(updateSpy).toHaveBeenCalled()
	})

	test('Should return 204 if UpdateDevice succeds', async () => {
		const { sut } = makeSut()
		const httpResponse = await sut.handle(makeFakeRequest())
		expect(httpResponse).toEqual(noContent())
	})

	test('Should return 500 if LoadSurvey throws', async () => {
		const { sut, updateDeviceStub } = makeSut()
		jest.spyOn(updateDeviceStub, 'update').mockImplementationOnce(throwError)
		const httpResponse = await sut.handle({})
		expect(httpResponse).toEqual(serverError(new Error()))
	})
})
