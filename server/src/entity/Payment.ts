import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import {Account} from './Account'
import {User} from './User'

@Entity('payment_requests')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string

  @Column({type: 'double'})
  amount: number

  @Column({type: 'double', default: 0.0})
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

  @CreateDateColumn()
  created_on: Date

  @UpdateDateColumn()
  updated_at: Date
}
