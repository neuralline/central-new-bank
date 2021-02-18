import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Acc from '../components/Acc'
import Pay from '../components/Pay'
import Req from '../components/Req'
import { StoreContext } from '../context/isAuth'
import bankCSS from '../styles/bank.module.scss'

export default function Users() {
  const router = useRouter()
  const { profile, authenticated } = useContext(StoreContext)

  useEffect(() => {
    if (!authenticated) {
      router.push('/login')
    }
  }, [])

  return (
    <>
      <Head>
        <title>{profile.name} - Central New Bank</title>
      </Head>

      <section>
        {authenticated ? (
          <>
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
            <h1>Error: you should not see this</h1>
          </>
        )}
      </section>
    </>
  )
}
