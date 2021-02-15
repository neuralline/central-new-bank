import Head from 'next/head'
import Nav from '../components/Nav'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Central New Bank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <main className="">
        <h1>Welcome to the future of banking</h1>
        <p>
          Here we have reached a turning point, divergent technology, in which
          we no longer do banking the same way as before
        </p>
      </main>
    </div>
  )
}
