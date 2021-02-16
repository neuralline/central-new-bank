import Head from 'next/head'
import React from 'react'
import LoginForm from '../components/LoginForm'

const login = () => {
  return (
    <div>
      <Head>
        <title>Login - Central New Bank</title>
      </Head>

      <LoginForm />
    </div>
  )
}

export default login
