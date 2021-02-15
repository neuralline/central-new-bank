import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { StoreContext } from '../context/provider'
import bankCSS from '../styles/bank.module.scss'
import { useRouter } from 'next/router'

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
      const res = await axios.post('http://localhost:5000/payments', {
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
      setError('The bank encountered error processing your payment')
      console.log(err)
    }
  }

  useEffect(() => {}, [])
  return (
    <div className="container">
      <Head>
        <title>Accounts - Central New Bank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>
        {profile.email ? (
          <>
            <h1>{error}</h1>
            <h2>Request payment</h2>

            <form className={bankCSS.Form} onSubmit={handleRequest}>
              Please provide payer's email address
              <input
                type="email"
                onChange={e => setSender(e.target.value || '')}
                value={sender}
              />
              Please provide the amount of money you are requesting
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
                <div>you don't have account </div>
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
      </main>
    </div>
  )
}
