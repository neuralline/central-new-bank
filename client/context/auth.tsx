import { createContext, FC, useReducer } from 'react'

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
  loading: true
}

const reducer = (state: State, { type, data }: Action) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: true,
        profile: data
      }
    case 'LOGOUT':
      return { ...state, authenticated: false, profile: initialUser }

    default:
      throw new Error(`unknown action type: ${type}`)
  }
}

export const StoreContext = createContext<ContextInterface>(undefined)

export const StoreProvider: FC = ({ children }) => {
  const [state, setProfile] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ ...state, setProfile }}>
      {children}
    </StoreContext.Provider>
  )
}
