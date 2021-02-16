import '../styles/app.scss'
import { StoreProvider } from '../context/isAuth'
import Layout from '../components/Layout'
import axios from 'axios'

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
