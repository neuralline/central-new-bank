import Link from 'next/link'
import React, { useContext } from 'react'
import { StoreContext } from '../context/auth'
import bankCSS from '../styles/bank.module.scss'

const Nav = () => {
  const { profile, authenticated } = useContext(StoreContext)
  return (
    <nav>
      <Link href="/">
        <h1>Central New Bank</h1>
      </Link>
      <div className={bankCSS.navLinks}>
        <Link shallow href="/">
          Home
        </Link>
        <Link shallow href="/accounts">
          Accounts
        </Link>
        <Link shallow href="/users">
          Users
        </Link>
        {authenticated ? (
          <>
            <Link shallow href="/request">
              Request
            </Link>
            <Link shallow href="/profile">
              {profile.name}
            </Link>
          </>
        ) : (
          <>
            <Link shallow href="/login">
              Login
            </Link>
            <Link shallow href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
