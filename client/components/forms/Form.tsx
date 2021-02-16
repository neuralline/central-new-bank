import { useState } from 'react'
import Input from './Input'

const Form = () => {
  const [email, setEmail] = useState<string>('')
  return (
    <form action="">
      <Input type="text" value={email} setValue={setEmail} />
      <button type="submit"></button>
    </form>
  )
}

export default Form
