import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { User } from '../custom'
import bankCss from '../styles/bank.module.scss'

export default function Users() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then(res => setUsers(res.data))
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="container">
      <Head>
        <title>Users - Central New Bank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <main>
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
      </main>
    </div>
  )
}
