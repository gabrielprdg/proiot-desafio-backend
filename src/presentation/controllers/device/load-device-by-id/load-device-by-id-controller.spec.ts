import { throwError } from '../../../../data/test/test-helper'
import { mockDeviceModel } from '../../../../domain/test/mock-device'
import { LoadDeviceById } from '../../../../domain/use-cases/device/load-device-by-id'
import { ok, serverError } from '../../../../presentation/helpers/http/http-helper'
import { HttpRequest } from '../../../../presentation/protocols'
import { mockLoadDeviceById } from '../../../../presentation/test'
import { LoadDeviceByIdController } from './load-device-by-id-controller'
import mockdate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
	params: {
		id: 'any_id'
	}
})

type SutTypes = {
  sut: LoadDeviceByIdController
  loadDeviceByIdStub: LoadDeviceById
}

const makeSut = (): SutTypes => {
	const loadDeviceByIdStub = mockLoadDeviceById()
	const sut = new LoadDeviceByIdController(loadDeviceByIdStub)

	return {
		sut,
		loadDeviceByIdStub
	}
}

describe('LoadDeviceById Controller', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})

	it('Should call LoadDeviceById with correct values', async () => {
		const { sut, loadDeviceByIdStub } = makeSut()
		const loadByIdSpy = jest.spyOn(loadDeviceByIdStub, 'loadById')
		const httpRequest = makeFakeRequest()
		await sut.handle(httpRequest)
		expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
	})

	it('Should return 500 if LoadDeviceById throws', async () => {
		const { sut, loadDeviceByIdStub } = makeSut()
		jest.spyOn(loadDeviceByIdStub, 'loadById').mockImplementationOnce(throwError)
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
