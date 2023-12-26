export type EventDataType = {
  reason: null | string
  event_code: null | string
  occurred: string
  event_name: string
  event_comments: string
}

export type SessionData = {
  session_comments: null | string
  user: string
  events: EventDataType[]
}
