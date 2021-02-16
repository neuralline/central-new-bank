export const environment = process.env.NODE_ENV
export const isProduction = environment === 'production'

export const server = isProduction
  ? 'http://localhost:5000'
  : 'http://localhost:5000'
