import {validate} from 'class-validator'
import {Request, Response, Router} from 'express'
import {Account} from '../entity/Account'

const accountsRouter = Router()

//READ  ALL USERS
accountsRouter.get('/', async (_: Request, res: Response) => {
  try {
    const accounts = await Account.find({relations: ['user']})
    return res.json(accounts)
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: 'something went wrong', err})
  }
})

//POST create new user
accountsRouter.post('/', async (req: Request, res: Response) => {
  const {balance, name, number, sort_code, user} = req.body
  try {
    const account = Account.create({balance, name, number, sort_code, user})
    const errors = await validate(account)
    if (errors.length > 0) throw errors

    await account.save()
    return res.status(201).json(account)
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: err})
  }
})

//UPDATE
accountsRouter.patch('/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid
  const {balance} = req.body
  try {
    const account = await Account.findOneOrFail({account_id: uuid})
    account.balance = balance || account.balance
    await account.save()
    return res.json(account)
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: 'something went wrong'})
  }
})

//DELETE
accountsRouter.delete('/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid
  try {
    const account = await Account.findOneOrFail({account_id: uuid})
    await account.remove()
    return res.status(204).json({message: 'Account removed'})
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: 'something went wrong'})
  }
})

//FIND
accountsRouter.get('/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid
  try {
    const account = await Account.findOneOrFail({account_id: uuid})
    return res.json(account)
  } catch (err) {
    console.log(err)
    return res.status(404).json({error: 'account not found'})
  }
})

export default accountsRouter
