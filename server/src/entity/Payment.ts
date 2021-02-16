import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import {Account} from './Account'
import MainEntity from './MainEntity'
import {User} from './User'

@Entity('payment_requests')
export class Payment extends MainEntity {
  constructor(sub: Partial<Payment>) {
    super()
    Object.assign(this, sub)
  }

  @PrimaryGeneratedColumn('uuid')
  payment_id: string

  @Column({type: 'numeric', precision: 7, scale: 2, default: 0.0})
  amount: number

  @Column({type: 'numeric', precision: 7, scale: 2, default: 0.0})
  amount_paid: number

  @ManyToOne(() => Account, account => account.account_id, {eager: true})
  @JoinColumn({name: 'account_id'})
  account: Account

  @ManyToOne(() => User, user => user.user_id, {eager: true})
  sender: User['user_id']

  @ManyToOne(() => User, user => user.user_id, {eager: true})
  receiver: User['user_id']

  @Column({type: 'int', default: 0})
  active: number
}
