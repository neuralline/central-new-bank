import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Acc from '../components/Acc'
import Nav from '../components/Nav'
import { Account } from '../custom'
import bankCSS from '../styles/bank.module.scss'

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([])
  console.log('accounts ---', accounts)

  useEffect(() => {
    axios
      .get('http://localhost:5000/accounts')
      .then(res => setAccounts(res.data))
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="container">
      <Head>
        <title>Accounts - Central New Bank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="">
        <h2>CNB users bank Accounts</h2>
        <Acc accounts={accounts} />
      </main>
    </div>
  )
}
