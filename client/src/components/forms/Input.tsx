import { FC } from 'react'

const Input: FC<InputInterface> = ({
  type = 'text',
  placeholder = '',
  value = '',
  setValue,
  className = '',
  required = true,
  error = '',
  max = 200,
  min = 0,
  title = ''
}) => {
  return (
    <>
      <input
        type={type}
        className={className}
        placeholder={placeholder || title}
        value={value}
        onChange={e => setValue(e.target.value)}
        required={required}
        maxLength={max}
        minLength={min}
        title={title || placeholder}
      />
      <small className="error">{error}</small>
    </>
  )
}

export default Input
