export type UpdateDeviceParams = {
  id?: string
  name?: string
  status?: string
  description?: string
  temperature?: string
  humidity?: string
  brightness?: string
}

export interface UpdateDevice {
  // to update a device we need both its id and the fields that will be updated
  update: (id: string, DeviceRawData: UpdateDeviceParams) => Promise<void>
}
