import Head from 'next/head'
import { FC } from 'react'
import { server } from '../config/config'
import bankCss from '../styles/bank.module.scss'

const Users: FC<{ users: User[] }> = ({ users }) => {
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
export const getServerSideProps = async () => {
  try {
    const response = await fetch(`${server}/users`)
    const users = await response.json()
    return {
      props: { users, message: '', error: false }
    }
  } catch (err) {
    console.log(err)
    return {
      props: { users: [], message: 'could not connect to server', error: true }
    }
  }
}
export default Users
