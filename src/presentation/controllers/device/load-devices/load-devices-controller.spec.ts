import { throwError } from '../../../../data/test/test-helper'
import { mockDevices } from '../../../../domain/test/mock-device'
import { LoadDevices } from '../../../../domain/use-cases/device/load-devices'
import { noContent, ok, serverError } from '../../../../presentation/helpers/http/http-helper'
import { mockLoadDevices } from '../../../../presentation/test'
import { LoadDevicesController } from './load-devices-controller'
import mockdate from 'mockdate'

type SutTypes = {
  sut: LoadDevicesController
  loadDevicesStub: LoadDevices
}

const makeSut = (): SutTypes => {
	const loadDevicesStub = mockLoadDevices()
	const sut = new LoadDevicesController(loadDevicesStub)

	return {
		loadDevicesStub,
		sut
	}
}

describe('LoadDevices Controller', () => {
	beforeAll(() => {
		mockdate.set(new Date())
	})

	afterAll(() => {
		mockdate.reset()
	})
	it('Should call LoadDevices', async () => {
		const { sut, loadDevicesStub } = makeSut()
		const loadAllSpy = jest.spyOn(loadDevicesStub, 'loadAll')
		await sut.handle({})
		expect(loadAllSpy).toHaveBeenCalled()
	})

	it('Should return 200 on success', async () => {
		const { sut } = makeSut()
		const httpResponse = await sut.handle({})
		expect(httpResponse).toEqual(ok(mockDevices()))
	})

	it('Should return 204 if LoadDevices returns empty', async () => {
		const { sut, loadDevicesStub } = makeSut()
		jest.spyOn(loadDevicesStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
		const httpResponse = await sut.handle({})
		expect(httpResponse).toEqual(noContent())
	})

	test('Should return 500 if LoadSurvey throws', async () => {
		const { sut, loadDevicesStub } = makeSut()
		jest.spyOn(loadDevicesStub, 'loadAll').mockImplementationOnce(throwError)
		const httpResponse = await sut.handle({})
		expect(httpResponse).toEqual(serverError(new Error()))
	})
})
