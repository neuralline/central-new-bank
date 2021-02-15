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
import {User} from './User'

@Entity('bank_accounts')
export class Account extends BaseEntity {
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

  @CreateDateColumn()
  created_on: Date

  @UpdateDateColumn()
  updated_at: Date
}
