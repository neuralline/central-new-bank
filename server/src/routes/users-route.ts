import {validate} from 'class-validator'
import {Request, Response, Router} from 'express'
import {User} from '../entity/User'

const usersRouter = Router()

usersRouter.get('/', async (_: Request, res: Response) => {
  try {
    const users = await User.find()
    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: 'something went wrong', err})
  }
})

usersRouter.post('/', async (req: Request, res: Response) => {
  const {name, email} = req.body
  try {
    const user = User.create({name, email})
    const errors = await validate(user)
    if (errors.length > 0) throw errors

    await user.save()
    return res.status(201).json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: err})
  }
})

//UPDATE
usersRouter.patch('/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid
  const {name} = req.body
  try {
    const user = await User.findOneOrFail({user_id: uuid})
    user.name = name || user.name
    await user.save()
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: 'something went wrong'})
  }
})

//DELETE
usersRouter.delete('/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOneOrFail({user_id: uuid})
    await user.remove()
    return res.status(204).json({message: 'User has been removed'})
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: 'something went wrong'})
  }
})

//FIND
usersRouter.get('/:email', async (req: Request, res: Response) => {
  const email = req.params.email
  try {
    const user = await User.findOneOrFail(
      {email: email},
      {relations: ['accounts', 'receiver', 'sender']}
    )
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({error: 'account not found'})
  }
})

export default usersRouter
