import { createContext, FC, useState } from 'react'
import { Profile, User } from '../custom'

const initialState: User = {
  user_id: '4088c091-af9c-4009-a7d3-b3ebe9dff513',
  name: 'User',
  email: '',
  accounts: [],
  sender: [],
  receiver: []
}

export const StoreContext = createContext<{
  profile?: User
  setProfile?: Function
}>({})

export const StoreProvider: FC = ({ children }) => {
  const [profile, setProfile] = useState(initialState)

  return (
    <StoreContext.Provider value={{ profile, setProfile }}>
      {children}
    </StoreContext.Provider>
  )
}
