import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, FormEvent, useContext, useEffect, useState } from 'react'
import { server } from '../config/config'
import { StoreContext } from '../context/isAuth'
import bankCSS from '../styles/bank.module.scss'
import Input from './forms/Input'

const LoginForm: FC<{ redirectTo?: string }> = ({
  redirectTo = '/profile'
}) => {
  const { profile, setProfile, authenticated } = useContext(StoreContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [errors, setErrors] = useState<any>({})
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!email) return setError('please provide your email')
      const res = await axios.post(`${server}/login`, {
        email,
        password
      })
      console.log('LOGIN, data:', res.data)
      setProfile({ type: 'LOGIN', data: res.data })
      router.push(redirectTo)
    } catch (err) {
      setError('Bank could not connect to server')
      console.log(err.response.data)
      if (!err.response) return
      setErrors(err.response.data)
    }
  }

  useEffect(() => {
    if (authenticated) {
      router.push(redirectTo || '/profile')
    }
  }, [])
  return (
    <div>
      <i>Hi {profile.name}</i>
      <h1>Please Login</h1>
      {error && <h2>{error}</h2>}
      <form name="bank-login" className={bankCSS.Form} onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          placeholder="email"
          setValue={setEmail}
          error={errors.email}
        />
        <Input
          type="password"
          value={password}
          placeholder="password"
          setValue={setPassword}
          error={errors.password}
        />
        <button type="submit">Login</button>
      </form>
      <div className="small">
        <small className="xs">
          By continuing, you agree to our User Agreement and Privacy Policy
        </small>
        <small>
          New to Central New Bank? please
          <Link href="/register" shallow>
            <a> Sign Up</a>
          </Link>
        </small>
      </div>
    </div>
  )
}

export default LoginForm
