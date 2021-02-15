import axios from 'axios'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import Acc from '../components/Acc'
import Login from '../components/login'
import Nav from '../components/Nav'
import Pay from '../components/Pay'
import Req from '../components/Req'
import { StoreContext } from '../context/provider'
import { Profile, User } from '../custom'
import bankCSS from '../styles/bank.module.scss'

export interface Icon {
  profile: Profile
}
export default function Users() {
  const { profile, setProfile } = useContext(StoreContext)
  const [userEmail, setEmail] = useState<string>('')

  useEffect(() => {
    if (profile.email) {
      setEmail(profile.email)
    }

    userEmail !== '' &&
      axios
        .get(`http://localhost:5000/users/${userEmail}`)
        .then(res => setProfile(res.data))
        .catch(err => console.log(err))
  }, [userEmail])

  return (
    <div className="container">
      <Head>
        <title>{profile.name} - Central New Bank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <main>
        {profile.email ? (
          <>
            <h2>
              <i>Greetings</i> {profile.name}
            </h2>
            <div key={profile.user_id} className={bankCSS.Card}>
              <div>accounts: {profile.accounts.length}</div>
              <div>Payments: {profile.sender.length}</div>
              <div>Requests: {profile.receiver.length}</div>
              <div className="xs"> your email: {profile.email} </div>
              <div className="xs"> user id: {profile.user_id}</div>
            </div>
            <div className={bankCSS.Grid}>
              <Acc accounts={profile.accounts} />
              <Pay payments={profile.sender} />
              <Req payments={profile.receiver} />
            </div>
          </>
        ) : (
          <>
            <Login setEmail={setEmail} />
          </>
        )}
      </main>
    </div>
  )
}
