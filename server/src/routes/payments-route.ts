import {validate} from 'class-validator'
import {Request, Response, Router} from 'express'
import {Account} from '../entity/Account'
import {Payment} from '../entity/Payment'
import {User} from '../entity/User'

const paymentsRoute = Router()
//READ all payments
paymentsRoute.get('/', async (req: Request, res: Response) => {
  const {active, sender, receiver} = req.body

  try {
    const payments = await Payment.find({active, sender, receiver})
    return res.json(payments)
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: 'something went wrong', err})
  }
})
//CREATE Payment
paymentsRoute.post('/', async (req: Request, res: Response) => {
  const {amount, account, sender, receiver} = req.body

  try {
    if (amount < 0.5 || 30000 < amount) {
      throw {message: 'please provide valid amount of money', error: true}
    }
    const user = await User.findOneOrFail({email: sender})

    const payment = Payment.create({
      amount,
      account,
      receiver,
      sender: user.user_id,
      amount_paid: 0,
      active: 1
    })
    const errors = await validate(payment)
    if (errors.length > 0) throw errors

    await payment.save()

    return res.status(201).json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: err})
  }
})

//UPDATE
paymentsRoute.patch('/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid
  const {amount, account_id} = req.body

  try {
    if (amount < 0.5 || 30000 < amount) {
      throw {message: 'please provide a valid amount of money', error: true}
    }

    const account = await Account.findOneOrFail({account_id})

    if (account.balance < amount) {
      throw {message: 'you do not have enough money', error: true}
    }

    const payment = await Payment.findOne({payment_id: uuid})
    if (!payment)
      return res
        .status(404)
        .json({message: 'Please select a valid account', error: true})
    //add payment
    payment.amount_paid = payment.amount_paid + amount

    if (payment.amount < payment.amount_paid + amount) {
      //it could be a tip though
      return res.status(401).json({message: 'you are over paying', error: true})
    }

    if (payment.amount_paid >= payment.amount) {
      payment.active = 0
    }

    //deduct payment
    account.balance = account.balance - amount
    //save result
    await account.save()
    await payment.save()
    const errors = await validate(payment)
    if (errors.length > 0) throw errors
    //return update
    return res.json(payment)
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({message: err.message || 'something went wrong', error: true})
  }
})

//DELETE
paymentsRoute.delete('/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid
  try {
    const pay = await Payment.findOneOrFail({payment_id: uuid})
    await pay.remove()
    return res.status(204).json({message: 'payment has been removed'})
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({message: 'something went wrong', error: true, err})
  }
})

//FIND
paymentsRoute.get('/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.email
  try {
    const payment = await Payment.findOneOrFail({payment_id: uuid})
    return res.json(payment)
  } catch (err) {
    console.log(err)
    return res.status(404).json({error: 'account not found'})
  }
})

export default paymentsRoute
