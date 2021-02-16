import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Acc from '../components/Acc'
import { server } from '../config/config'

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([])
  console.log('accounts ---', accounts)

  useEffect(() => {
    axios
      .get(`${server}/accounts`)
      .then(res => setAccounts(res.data))
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <Head>
        <title>Accounts - Central New Bank</title>
      </Head>

      <section>
        <h2>CNB users bank Accounts</h2>
        <Acc accounts={accounts} />
      </section>
    </>
  )
}
