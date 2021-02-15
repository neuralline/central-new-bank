import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import routes from './routes';
const app = express();
app.use(express.json());

// ROUTES
app.use(routes);

//LISTEN
createConnection()
  .then(async (connection) => {
    app.listen(5000, () =>
      console.log('Server is running at http://localhost:5000'),
    );
  })
  .catch((error) => console.log(error));
