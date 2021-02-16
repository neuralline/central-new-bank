import React, { FC } from 'react'
import bankCSS from '../styles/bank.module.scss'

const Req: FC<{ payments: Payment[] }> = ({ payments }) => {
  return (
    <section>
      <h2>requests</h2>
      {payments.length ? (
        payments.map(pay => (
          <div key={pay.payment_id} className={bankCSS.Card}>
            <div>To {pay.receiver.name}</div>
            <div className="xs">from {pay.sender.name}</div>
            <div>
              Amount: <i>£{pay.amount}</i>
            </div>
            <div className="focus">
              You have received: <i>£{pay.amount_paid}</i>
            </div>
            {pay.active ? (
              <>
                <div className="focus">
                  <i>pending</i>
                </div>
                <div className="focus">
                  remaining: <i>£{pay.amount - pay.amount_paid}</i>
                </div>
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

export default Req
