export interface State {
  authorized: boolean
  authenticated: boolean
  profile: Profile
  loading: boolean
  token: string
  errors: any
  message: string
}

export interface Profile {
  user_id: string
  name: string
  email: string
  accounts: any
  sender: any
  receiver: any
}
