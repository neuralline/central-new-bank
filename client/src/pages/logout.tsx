import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { server } from '../config/config'
import { StoreContext } from '../context/isAuth'

const Logout = () => {
  const { setProfile, authenticated } = useContext(StoreContext)
  const router = useRouter()
  useEffect(() => {
    if (!authenticated) router.push('/login')
    async function unloadUser() {
      try {
        await axios.post(`${server}/logout`)
        setProfile({ type: 'LOGOUT', data: [] })
      } catch (err) {
        console.log('logout error', err.response.data)
      }
    }
    unloadUser()
  }, [])
  return (
    <div>
      you are now logged out from the bank
      <p>
        <Link href="/login">Login</Link>
      </p>
    </div>
  )
}

export default Logout
