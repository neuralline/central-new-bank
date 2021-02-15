import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import {Account} from './Account'
import {Payment} from './Payment'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string

  @Column({type: 'varchar', length: 128, default: ''})
  name: string

  @Column({type: 'varchar', length: 128, default: '', unique: true})
  email: string

  @OneToMany(() => Account, acc => acc.user, {cascade: true})
  accounts: Account[]

  @OneToMany(() => Payment, pay => pay.sender, {cascade: true})
  sender: Payment[]

  @OneToMany(() => Payment, pay => pay.receiver, {cascade: true})
  receiver: Payment[]

  @CreateDateColumn()
  created_on: Date

  @UpdateDateColumn()
  updated_at: Date
}
