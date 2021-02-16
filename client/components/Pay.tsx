import Link from 'next/link'
import React, { FC } from 'react'
import bankCSS from '../styles/bank.module.scss'

const Pay: FC<{ payments: Payment[] }> = ({ payments }) => {
  return (
    <section>
      <h2>payments</h2>
      {payments.length ? (
        payments.map(pay => (
          <div key={pay.payment_id} className={bankCSS.Card}>
            <div>From {pay.sender.name}</div>
            <div className="xs">to {pay.receiver.name}</div>
            <div>
              Amount: <i>£{pay.amount}</i>
            </div>
            <div>
              You have paid: <i>£{pay.amount_paid}</i>
            </div>

            {pay.active ? (
              <>
                <div className="focus">
                  <i>pending</i>
                </div>
                <Link shallow href={`/payment/${pay.payment_id}`}>
                  <button>pay now</button>
                </Link>
              </>
            ) : (
              <div className="focus">
                <i>completed</i>
              </div>
            )}
            <div className="xs">account: {pay.account.account_id}</div>
          </div>
        ))
      ) : (
        <div className={bankCSS.Card}>No request</div>
      )}
    </section>
  )
}

export default Pay
