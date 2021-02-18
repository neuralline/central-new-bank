import axios from 'axios'
import { createContext, FC, useEffect, useReducer } from 'react'
import { server } from '../config/config'

const initialUser: User = {
  user_id: '',
  name: 'User',
  email: '',
  accounts: [],
  sender: [],
  receiver: []
}

const initialState: State = {
  authenticated: false,
  profile: { ...initialUser },
  loading: true,
  token: '',
  errors: [],
  message: ''
}

const reducer = (state: State, { type, data }: Action) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        ...data
      }
    case 'REFRESH':
      return {
        ...state,
        profile: data
      }
    case 'LOGOUT':
      console.log('LOGOUT')
      return { ...initialState, authenticated: false }

    default:
      throw new Error(`unknown action type: ${type}`)
  }
}

export const StoreContext = createContext<ContextInterface>(undefined)

export const StoreProvider: FC = ({ children }) => {
  const [state, setProfile] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.defaults.withCredentials = true
    const loadUser = async () => {
      try {
        const res = await await axios.post(`${server}/me`)
        if (!res.data) return
        setProfile({ type: 'LOGIN', data: res.data })
      } catch (err) {
        console.log('provider context', err.response.data)
      }
    }
    loadUser()
  }, [])

  return (
    <StoreContext.Provider value={{ ...state, setProfile }}>
      {children}
    </StoreContext.Provider>
  )
}
