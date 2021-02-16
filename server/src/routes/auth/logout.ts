import cookie from 'cookie'
import {Request, Response} from 'express'

export const logout = (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/'
    })
  )

  return res.status(200).json({success: true})
}
