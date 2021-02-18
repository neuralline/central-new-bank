import bcrypt from 'bcrypt'
import {Exclude} from 'class-transformer'
import {IsEmail, Length} from 'class-validator'
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import {Account} from './Account'
import MainEntity from './MainEntity'
import {Payment} from './Payment'

@Entity('users')
export class User extends MainEntity {
  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }
  @PrimaryGeneratedColumn('uuid')
  user_id: string

  @Length(3, 128, {message: 'Must be at least 3 characters long'})
  @Column({type: 'varchar', length: 128, default: ''})
  name: string

  @IsEmail(undefined, {message: 'Must be a valid email address'})
  @Length(1, 128, {message: 'Email is empty'})
  @Column({type: 'varchar', length: 128, default: '', unique: true})
  email: string

  @Exclude()
  @Column()
  @Length(6, 255, {message: 'Must be at least 6 characters long'})
  password: string

  @OneToMany(() => Account, acc => acc.user, {cascade: true})
  accounts: Account[]

  @OneToMany(() => Payment, pay => pay.sender, {cascade: true})
  sender: Payment[]

  @OneToMany(() => Payment, pay => pay.receiver, {cascade: true})
  receiver: Payment[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6)
  }
}
