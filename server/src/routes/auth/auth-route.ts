import {Request, Response, Router} from 'express'
import jwt from 'jsonwebtoken'
import {initialState} from '../../auth/isAuth'
import {loadUserByUserId} from './../../auth/isAuth'
import {login} from './login'
import {logout} from './logout'
import {register} from './register'

const me = async (req: Request, res: Response) => {
  try {
    const token: string = req.cookies.token || ''
    if (!token) {
      return res.status(401).json({message: 'User is not authenticated'})
    }

    const {user_id}: any = jwt.verify(token, process.env.JWT_SECRET)
    const user = await loadUserByUserId(user_id)
    if (!user) return res.status(404).json({message: 'User not found'})

    const state = {
      ...initialState,
      profile: user,
      authenticated: true,
      token: token
    }

    return res.json(state)
  } catch (err) {
    console.log(err)
    return res.status(401).json(initialState)
  }
}

const authRoutes = Router()
authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/me', me)
authRoutes.post('/logout', logout)

export default authRoutes
