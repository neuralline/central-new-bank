import axios from 'axios'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import Acc from '../components/Acc'
import { server } from '../config/config'

const Accounts: FC<{ accounts: Account[] }> = ({ accounts }) => {
  return (
    <>
      <Head>
        <title>Accounts - Central New Bank</title>
      </Head>

      <section>
        <h2>CNB users bank Accounts</h2>
        <Acc accounts={accounts} />
      </section>
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const response = await fetch(`${server}/accounts`)
    const accounts = await response.json()
    return {
      props: { accounts, message: '', error: false }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        accounts: [],
        message: 'could not connect to server',
        error: true
      }
    }
  }
}
export default Accounts
