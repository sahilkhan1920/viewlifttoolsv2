type ResponseCommonType = {
  status: number
}
export type AddUserSuccessResponse = ResponseCommonType & {
  authorizationToken: string
  email: string
  isSubscribed: boolean
  name: string
  picture: string
  profileId: string
  provider: string
  refreshToken: string
  userId: string
}

export type AddUserErrorResponseType = ResponseCommonType & {
  code: string
  error: string
}

export type AddUserResponse = AddUserSuccessResponse | AddUserErrorResponseType
