interface Account {
  account_id: string
  balance: number
  name: string
  number: string
  sort_code: string
  user: User
}

interface User {
  user_id: string
  name: string
  email: string
  accounts: Account[]
  sender: Payment[]
  receiver: Payment[]
}

interface Payment {
  payment_id: string
  amount: number
  amount_paid: number
  account: Account
  sender: User
  receiver: User
  active: number
}

interface State {
  authenticated: boolean
  profile: User
  loading: boolean
  token: string
  errors: any
  message: string
}

interface Action {
  type: 'LOGIN' | 'LOGOUT' | 'REFRESH'
  data: any
}

interface ContextInterface extends State {
  state?: State
  setProfile?: (item: Action) => void
}

interface InputInterface {
  value: T
  className?: string
  type?: 'email' | 'password' | 'text' | 'username' | 'number'
  placeholder?: string
  error?: string
  required?: boolean
  max?: number
  min?: number
  title?: string
  setValue: <T extends SetStateAction>(args: T) => void
}

interface Profile extends User {
  isLoggedIn: boolean
}
