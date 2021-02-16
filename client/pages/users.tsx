import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { server } from '../config/config'
import bankCss from '../styles/bank.module.scss'

export default function Users() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios
      .get(`${server}/users`)
      .then(res => setUsers(res.data))
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <Head>
        <title>Users - Central New Bank</title>
      </Head>

      <section>
        <h2>CNB Users</h2>

        {users.length ? (
          users.map(acc => (
            <div key={acc.user_id} className={bankCss.Card}>
              <div className="title">{acc.name}</div>
              <div>{acc.email}</div>
              <div className="xs">{acc.user_id}</div>
            </div>
          ))
        ) : (
          <div>loading</div>
        )}
      </section>
    </>
  )
}
