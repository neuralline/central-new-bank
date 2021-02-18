import Link from 'next/link'
import React, { FC } from 'react'
import bankCSS from '../styles/bank.module.scss'

const Acc: FC<{ accounts: Account[] }> = ({ accounts }) => {
  return (
    <section className="section">
      <h2>
        <Link href="/add">Add account</Link>
      </h2>
      {accounts.length ? (
        accounts.map(acc => (
          <div key={acc.account_id} className={bankCSS.Card}>
            <div>{acc.name}</div>
            <div>
              Balance: <i>£{acc.balance}</i>
            </div>
            <div>{acc.user.name}</div>
            <div className="xs">id: {acc.account_id}</div>
            <div className="xs">number: {acc.number}</div>
            <div className="xs">sort code: {acc.sort_code}</div>
          </div>
        ))
      ) : (
        <div className={bankCSS.Card}>You have zero account</div>
      )}
    </section>
  )
}

export default Acc
