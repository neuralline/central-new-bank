import Link from 'next/link'
import React from 'react'
import bankCSS from '../styles/bank.module.scss'

const Nav = () => {
  return (
    <nav>
      <Link href="/">
        <h1>Central New Bank</h1>
      </Link>
      <div className={bankCSS.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/accounts">Accounts</Link>
        <Link href="/users">Users</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/request">Request</Link>
      </div>
    </nav>
  )
}

export default Nav
