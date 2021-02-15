export interface Account {
  account_id: string
  balance: number
  name: string
  number: string
  sort_code: string
  user: User
}

export interface User {
  user_id: string
  name: string
  email: string
  accounts: Account[]
  sender: Payment[]
  receiver: Payment[]
}

export interface Payment {
  payment_id: string
  amount: number
  amount_paid: number
  account: Account
  sender: User
  receiver: User
  active: number
}

export interface Profile extends User {
  isLoggedIn: boolean
}
