import { LoadDevices } from '../../../../domain/use-cases/device/load-devices'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class LoadDevicesController implements Controller {
	private readonly loadDevices: LoadDevices

	constructor (loadDevices: LoadDevices) {
		this.loadDevices = loadDevices
	}

	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const devices = await this.loadDevices.loadAll()

			return devices.length ? ok(devices) : noContent()
		} catch (err: any) {
			return serverError(err)
		}
	}
}
