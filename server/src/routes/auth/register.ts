import {validate} from 'class-validator'
import {Request, Response} from 'express'
import {mapErrors} from '../../auth/isAuth'
import {User} from '../../entity/User'

export const register = async (req: Request, res: Response) => {
  const {email, name, password} = req.body

  try {
    // Validate data
    let errors: any = {}
    const emailUser = await User.findOne({email})
    // const nameUser = await User.findOne({name})

    if (emailUser) errors.email = 'Email is already taken'
    // if (nameUser) errors.name = 'name is already taken'

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors)
    }

    // Create the user
    const user = new User({email, name, password})
    errors = await validate(user)
    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors))
    }

    await user.save()

    // Return the user

    return res.status(201).json({message: 'user registered', error: false})
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: 'user registered', error: false, err})
  }
}
