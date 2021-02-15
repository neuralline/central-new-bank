import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { StoreContext } from '../../context/provider'
import bankCSS from '../../styles/bank.module.scss'

export default function BankPayment() {
  const router = useRouter()
  const { id } = router.query
  const { profile } = useContext(StoreContext)
  const [amount, setAmount] = useState<number>(0)
  const [account_id, setAccount_id] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleRequest = async e => {
    e.preventDefault()
    setError('')

    if (!account_id) return setError('please select account')
    if (amount < 0.1 || amount > 30000)
      return setError('allowed amount is £0.1 to £30,000')

    try {
      const res = await axios.patch(`http://localhost:5000/payments/${id}`, {
        amount,
        account_id
      })
      console.log('request res.data', res.data)
      setAmount(0)
      setAccount_id('')
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
            <h2>Pay or we will take it</h2>

            <form className={bankCSS.Form} onSubmit={handleRequest}>
              <label className="small">
                Please select the amount you want to pay
              </label>
              <input
                type="text"
                onChange={e => setAmount(parseInt(e.target.value) || 0)}
                value={amount}
              />
              <label className="small">
                select the account you want to pay from
              </label>
              {profile.accounts.length ? (
                <select
                  onChange={e => setAccount_id(e.target.value)}
                  value={account_id}
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
              <label className="small">
                By submitting you indicate that you have read and agree to the
                terms and conditions of the the Banks Customer Agreement
              </label>
              <button type="submit" onSubmit={handleRequest}>
                Pay now
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
