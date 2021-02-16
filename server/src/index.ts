import express from 'express'
import dotenv from 'dotenv'
import 'reflect-metadata'
import {createConnection} from 'typeorm'
import routes from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
  })
)

// ROUTES
app.use(routes)
//Greetings
app.get('/', (_, res) => res.send('Greetings user'))

//LISTEN
const PORT = process.env.PORT
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`)

  try {
    await createConnection()
    console.log('Database connected!')
  } catch (err) {
    console.log(err)
  }
})
