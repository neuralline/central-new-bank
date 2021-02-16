import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { StoreContext } from '../context/auth'
import bankCSS from '../styles/bank.module.scss'
import { useRouter } from 'next/router'
import { server } from '../config/config'
import Input from '../components/forms/Input'

export default function Requests() {
  const { profile } = useContext(StoreContext)
  const router = useRouter()
  const [amount, setAmount] = useState<number>(0)
  const [account, setAccount] = useState<string>('')
  const [sender, setSender] = useState<string>('robinhood@banker.com')
  const [error, setError] = useState<string>('')

  const handleRequest = async e => {
    e.preventDefault()
    setError('')
    try {
      await axios.post(`${server}/payments`, {
        amount,
        account,
        sender,
        receiver: profile.user_id
      })
      setAmount(0)
      setAccount('')
      setSender('')
      router.push('/profile')
    } catch (err) {
      setError(err.response.data.error.message)
      console.log(err.response.data.error.message)
    }
  }

  useEffect(() => {}, [])
  return (
    <>
      <Head>
        <title>Accounts - Central New Bank</title>
      </Head>

      <section>
        {profile.email ? (
          <>
            <h1>Request payment</h1>
            <h2 className="error">{error}</h2>

            <form className={bankCSS.Form} onSubmit={handleRequest}>
              <small>Please provide payer's email address</small>
              <Input type="email" setValue={setSender} value={sender} />
              <small>
                Please provide the amount of money you are requesting
              </small>
              <input
                type="text"
                onChange={e => setAmount(parseInt(e.target.value) || 0)}
                value={amount}
              />
              {profile.accounts.length ? (
                <select
                  onChange={e => setAccount(e.target.value)}
                  value={account}
                >
                  <option value="">none</option>
                  {profile.accounts.map(acc => (
                    <option key={acc.account_id} value={acc.account_id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="error">You don't have bank account! </div>
              )}
              <button type="submit" onSubmit={handleRequest}>
                Request
              </button>
            </form>
          </>
        ) : (
          <div>
            <Link href="/profile">
              <h1>Please login</h1>
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
