import jwt from 'jsonwebtoken'
import {Request, Response, Router} from 'express'
import {User} from '../../entity/User'
import {login} from './login'
import {logout} from './logout'
import {register} from './register'

const me = async (req: Request, res: Response) => {
  try {
    const token: string = req.cookies.token.trim() || ''

    console.log('token', token, process.env.JWT_SECRET!)

    if (!token) {
      return res.status(401).json({message: 'User is not authenticated'})
    }
    const {email}: any = jwt.verify(token, process.env.JWT_SECRET)
    console.log(email)
    const user = await User.findOneOrFail(
      {email: email},
      {relations: ['accounts', 'receiver', 'sender']}
    )

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(401).json({error: 'account not found'})
  }
}

const authRoutes = Router()
authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/me', me)
authRoutes.get('/logout', logout)

export default authRoutes
