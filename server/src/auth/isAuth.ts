import {User} from '../entity/User'
import {Profile, State} from './../../custom.d'
export const initialUser: Profile = {
  user_id: '',
  name: 'User',
  email: '',
  accounts: [],
  sender: [],
  receiver: []
}

export const initialState: State = {
  authorized: false,
  authenticated: false,
  profile: {...initialUser},
  loading: true,
  token: '',
  errors: [],
  message: ''
}

export const mapErrors = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1]
    return prev
  }, {})
}

export const loadUserByEmail = async (email: string) => {
  if (!email) return
  return await User.findOneOrFail(
    {email},
    {relations: ['accounts', 'receiver', 'sender']}
  )
}
export const loadUserByUserId = async (user_id: string) => {
  if (!user_id) return
  return await User.findOneOrFail(
    {user_id},
    {relations: ['accounts', 'receiver', 'sender']}
  )
}
