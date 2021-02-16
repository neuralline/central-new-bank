import { FC, useContext } from 'react'
import { StoreContext } from '../context/isAuth'
import styles from '../styles/app.module.scss'
import Nav from './Nav'

const Layout: FC = ({ children }) => {
  const { authenticated, profile } = useContext(StoreContext)
  return (
    <div className={styles.container}>
      <Nav />
      <>
        <h2>
          {authenticated && (
            <>
              <i>Greetings</i> {profile.name}
            </>
          )}
        </h2>
      </>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout
