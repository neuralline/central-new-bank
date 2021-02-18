import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Input from '../../components/forms/Input'
import { server } from '../../config/config'
import { StoreContext } from '../../context/isAuth'
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
      const res = await axios.patch(`${server}/payments/${id}`, {
        amount,
        account_id
      })
      console.log('request res.data', res.data)
      setAmount(0)
      setAccount_id('')
      router.push('/profile')
    } catch (err) {
      console.log(err.response.data || '')
      setError(err.response.data.message)
    }
  }

  useEffect(() => {}, [])
  return (
    <>
      <Head>
        <title>Accounts - Central New Bank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        {profile.email ? (
          <>
            <h1>Pay online</h1>
            <h2>Pay or we will take it</h2>
            {error && <p className="error">{error}</p>}

            <form className={bankCSS.Form} onSubmit={handleRequest}>
              <Input
                type="number"
                setValue={setAmount}
                value={amount}
                title=" Please select the amount you want to pay"
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
              <button type="submit" onSubmit={handleRequest}>
                Pay now
              </button>
              <small>
                By submitting you indicate that you have read and agree to the
                terms and conditions of the the Banks Customer Agreement
              </small>
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
