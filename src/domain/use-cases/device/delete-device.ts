export interface DeleteDevice {
  delete: (id: string) => Promise<void>
}
