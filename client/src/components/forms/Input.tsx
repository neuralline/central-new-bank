import { FC, useState } from 'react'

const Input: FC<InputInterface> = ({
  type = 'text',
  placeholder = '',
  value = '',
  setValue,
  className = '',
  required = true,
  error = ''
}) => {
  return (
    <>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        required={required}
      />
      <small className="error">{error}</small>
    </>
  )
}

export default Input
