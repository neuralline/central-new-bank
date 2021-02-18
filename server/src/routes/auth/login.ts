import bcrypt from 'bcrypt'
import {isEmpty} from 'class-validator'
import cookie from 'cookie'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {initialState, loadUserByEmail} from './../../auth/isAuth'

export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body
  try {
    let errors: any = {}
    if (isEmpty(email)) errors.email = 'email must not be empty'
    if (isEmpty(password)) errors.password = 'Password must not be empty'
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors)
    }

    const user = await loadUserByEmail(email)
    if (!user) return res.status(404).json({email: 'User not found'})
    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      return res.status(401).json({password: 'Password is incorrect'})
    }

    const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET!)

    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/'
      })
    )
    const state = {
      ...initialState,
      profile: user,
      authenticated: true,
      token: token
    }

    return res.json(state)
  } catch (err) {
    console.log(err)
    return res
      .status(404)
      .json({message: 'account not found', error: true, success: false})
  }
}
