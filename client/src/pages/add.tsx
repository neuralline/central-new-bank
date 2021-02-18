import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import Input from '../components/forms/Input'
import { server } from '../config/config'
import { StoreContext } from '../context/isAuth'
import bankCSS from '../styles/bank.module.scss'

export default function AddAccounts() {
  const { profile, authenticated, setProfile } = useContext(StoreContext)
  const [fullName, setFullName] = useState<string>('')
  const [accountBalance, setAccountBalance] = useState<number>(0)
  const [sortCode, setSortCode] = useState<string>('')
  const [accountNumber, setAccountNumber] = useState<string>('')
  const [errors, setErrors] = useState<any>({})
  const [accounts, setAccounts] = useState<Account[]>([])
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!accountNumber) return
      const res = await axios.post(`${server}/accounts`, {
        balance: accountBalance,
        number: accountNumber,
        name: fullName,
        sort_code: sortCode,
        user_id: profile.user_id
      })
      console.log('bank account added ', res)
      setProfile({ type: 'REFRESH', data: res.data })
      router.push('/profile')
    } catch (err) {
      console.log(err.response)
      if (!err.response) return
      setErrors(err.response.data)
    }
  }

  useEffect(() => {}, [])
  return (
    <>
      <Head>
        <title>Accounts - Central New Bank</title>
      </Head>

      <section>
        <>
          <i>Hi {profile.name}</i>
          <h1>Add new bank account</h1>
          <form className={bankCSS.Form} onSubmit={handleSubmit}>
            <Input
              value={fullName}
              setValue={setFullName}
              placeholder="account name"
              error={errors.name}
            />
            <input
              value={accountBalance}
              onChange={e => setAccountBalance(parseInt(e.target.value) || 0)}
              placeholder="account balance"
              title="account balance"
            />
            <small className="error">{errors.balance}</small>
            <Input
              value={accountNumber}
              setValue={setAccountNumber}
              placeholder="account number"
              error={errors.number}
              max={12}
            />
            <Input
              value={sortCode}
              setValue={setSortCode}
              placeholder="sort code"
              error={errors.sort_code}
              max={8}
            />
            <button type="submit">Add Account</button>
            <div className="small">
              <small className="xs">
                By continuing, you agree to our User Agreement and Privacy
                Policy
              </small>
            </div>
          </form>
        </>
      </section>
    </>
  )
}
