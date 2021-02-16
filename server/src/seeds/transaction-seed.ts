import {Seeder} from 'typeorm-seeding'
import {Connection} from 'typeorm'
import bcrypt from 'bcrypt'
import {User} from '../entity/User'
import {Account} from '../entity/Account'

function timePlus(duration = 0) {
  const time = new Date('2020-11-07 07:01:43.18').getTime()

  return new Date(time + duration).toISOString()
}

export default class CreateData implements Seeder {
  public async run(_: any, connection: Connection): Promise<any> {
    const password = await bcrypt.hash('123456', 6)

    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24

    // Create users
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'Mr Banker',
          email: 'mrbanker@cnbank.com',
          password,
          createdAt: timePlus(),
          updatedAt: timePlus()
        },
        {
          name: 'Robin Hood',
          email: 'roobinhood@cnbank.com',
          password,
          createdAt: timePlus(minute * 5),
          updatedAt: timePlus(minute * 5)
        }
      ])
      .execute()

    const Banker = await User.findOne({email: 'mrbanker@cnbank.com'})
    const Hood = await User.findOne({email: 'roobinhood@cnbank.com'})

    // Create subs
    await connection
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values([
        {
          balance: 20000,
          name: 'Investment Card',
          number: '00445155212121',
          sort_code: '12235462',
          user: Banker
        },
        {
          balance: 15000,
          name: 'Not so Hood',
          number: '00555155212121',
          sort_code: '5535462',
          user: Hood
        }
      ])
      .execute()
  }
}
