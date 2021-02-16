import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, FormEvent, useContext, useEffect, useState } from 'react'
import Input from '../components/forms/Input'
import { server } from '../config/config'
import { StoreContext } from '../context/auth'
import bankCSS from '../styles/bank.module.scss'

const Register: FC<{ redirectTo?: string }> = ({ redirectTo = '/profile' }) => {
  const { profile, setProfile } = useContext(StoreContext)
  const [email, setEmail] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [errors, setErrors] = useState<any>({})
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!email) return setError('please provide your email')
      const res = await axios.post(`${server}/register`, {
        email,
        password,
        name: fullName
      })
      console.log('registered ', res)
      //setProfile({ type: 'LOGIN', data: res.data })
      router.push('./login')
    } catch (err) {
      setError('Bank could not connect to server')
      setErrors(err.response.data)
      console.log(err.response)
    }
  }

  useEffect(() => {
    if (profile.email) {
      router.push(redirectTo)
    }
  }, [])
  return (
    <div>
      <form className={bankCSS.Form} onSubmit={handleSubmit}>
        <i>Hi {profile.name}</i>
        <h1>Please sign up</h1>
        {error && <h2>{error}</h2>}
        <Input
          value={fullName}
          setValue={setFullName}
          placeholder="full name"
          error={errors.name}
        />

        <Input
          type="email"
          value={email}
          setValue={setEmail}
          placeholder="email"
          error={errors.email}
        />

        <Input
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="password"
          error={errors.password}
        />
        <button type="submit">Sign Up</button>
        <div className="small">
          <small className="xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </small>
          <small>
            Already a member? please
            <Link href="/login" shallow>
              <a> Login</a>
            </Link>
          </small>
        </div>
      </form>
    </div>
  )
}

export default Register
