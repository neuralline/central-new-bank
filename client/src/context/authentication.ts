import axios from 'axios'
import { server } from '../config/config'

axios.defaults.withCredentials = true
export const unloadUser = async () => {
  try {
    await axios.post(`${server}/logout`)
  } catch (err) {
    console.log('provider context', err.response.data)
  }
}

export const loadUser = async () => {
  try {
    const res = await await axios.post(`${server}/me`)

    return res.data
  } catch (err) {
    console.log('provider context', err.response.data)
    return err.response.data
  }
}
