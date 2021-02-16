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
import MainEntity from './MainEntity'
import {User} from './User'

@Entity('bank_accounts')
export class Account extends MainEntity {
  constructor(sub: Partial<Account>) {
    super()
    Object.assign(this, sub)
  }

  @PrimaryGeneratedColumn('uuid')
  account_id: string

  @Column('double')
  balance: number

  @Column()
  name: string

  @Column({type: 'varchar', length: 12, default: '', unique: true})
  number: string

  @Column({type: 'varchar', length: 8, default: ''})
  sort_code: string

  @ManyToOne(() => User, user => user.accounts, {eager: true})
  @JoinColumn({name: 'user_id'})
  user: User
}
