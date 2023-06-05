import { FieldValue } from 'firebase/firestore'

export type User = {
  created_at: FieldValue
  email: string
  username: string
  id: string
  updated_at: null | string
}
