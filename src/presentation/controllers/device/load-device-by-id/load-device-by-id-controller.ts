import { LoadDeviceById } from '../../../../domain/use-cases/device/load-device-by-id'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class LoadDeviceByIdController implements Controller {
	private readonly loadDeviceById: LoadDeviceById

	constructor (loadDeviceById: LoadDeviceById) {
		this.loadDeviceById = loadDeviceById
	}

	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { id } = httpRequest.params
			const device = await this.loadDeviceById.loadById(id)

			return ok(device)
		} catch (err: any) {
			return serverError(err)
		}
	}
}
