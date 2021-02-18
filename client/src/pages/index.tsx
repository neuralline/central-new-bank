import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Central New Bank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        <h1>Welcome to the future of banking</h1>
        <p>
          Here we have reached a turning point, divergent technology, in which
          we no longer do banking the same way as before
        </p>
        <p>
          <small>
            <Link shallow href="/accounts">
              Accounts
            </Link>
          </small>

          <small>
            {' '}
            <Link shallow href="/users">
              Users
            </Link>
          </small>
        </p>
      </section>
    </>
  )
}
