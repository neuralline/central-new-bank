import {Length} from 'class-validator'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import MainEntity from './MainEntity'
import {Payment} from './Payment'
import {User} from './User'

@Entity('bank_accounts')
export class Account extends MainEntity {
  constructor(account: Partial<Account>) {
    super()
    Object.assign(this, account)
  }

  @PrimaryGeneratedColumn('uuid')
  account_id: string

  @Column({type: 'numeric', precision: 7, scale: 2, default: 0.0})
  balance: number

  @Length(1, 128, {message: 'account name is required'})
  @Column()
  name: string

  @Length(12, 12, {message: 'account number should be 12 digit'})
  @Column({type: 'varchar', length: 12, default: '', unique: true})
  number: string

  @Length(8, 8, {message: 'sort code should be 8 digit'})
  @Column({type: 'varchar', length: 8, default: ''})
  sort_code: string

  @ManyToOne(() => User, user => user.accounts, {eager: true})
  user: User['user_id']

  @OneToMany(() => Payment, payment => payment.account, {cascade: true})
  account: Payment
}
