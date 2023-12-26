export type DeviceType = {
  addedDate: string
  deviceId: string
  deviceName: string
  updateDate: string
}

export type DeviceResponseType = { Count: number; Items: Array<DeviceType> | Array<never> }
