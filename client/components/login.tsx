import Link from 'next/link'
import React, { FC, useState } from 'react'
import bankCSS from '../styles/bank.module.scss'

const Login: FC<{ setEmail: Function }> = ({ setEmail }) => {
  const [userEmail, setUserEmail] = useState<string>('mrbanker@banker.com')

  return (
    <div>
      <i>Hi</i>
      <Link href="/">
        <h1>Please login</h1>
      </Link>
      <form
        className={bankCSS.navLinks}
        onSubmit={e => {
          e.preventDefault()
          setEmail(userEmail)
        }}
      >
        <input
          type="email"
          value={userEmail}
          placeholder="mrbanker@banker.com"
          onChange={e => setUserEmail(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
