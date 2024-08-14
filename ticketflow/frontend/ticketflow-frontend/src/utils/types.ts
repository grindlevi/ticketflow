import { Priority } from "./enums"

export type LoginResponse = {
  jwt: string,
  username: string
  roles: string[]
}

export type Ticket = {
  publicId: string,
  title: string,
  description: string,
  username: string,
  priority: Priority
}