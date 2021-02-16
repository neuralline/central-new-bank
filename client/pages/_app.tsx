import '../styles/app.scss'
import { StoreProvider } from '../context/auth'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default MyApp
