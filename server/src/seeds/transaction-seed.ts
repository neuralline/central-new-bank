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
    // Create users
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'Banker',
          email: 'banker@bank.com',
          password: bcrypt.hash('banker', 6)
        },
        {
          name: 'Robin ',
          email: 'roobin@bank.com',
          password: bcrypt.hash('robin', 6)
        },
        {
          name: 'Robber',
          email: 'robber@bank.com',
          password: bcrypt.hash('robber', 6)
        }
      ])
      .execute()

    const Banker = await User.findOne({email: 'mrbanker@bank.com'})
    const Hood = await User.findOne({email: 'roobinhood@bank.com'})

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
