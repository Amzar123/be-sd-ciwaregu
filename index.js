import express from "express";
import db from './src/configs/db.config.js';
import { Users } from './src/models/UserModel.js';
import router from "./src/routes/index.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
import express from 'express';
import bodyParser  from 'body-parser';
import router from './src/routes/index.js';

const galleriesRouter = require('./src/routes/galleries.route');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//connect to database
try {
  await db.authenticate();
  console.log('Database Connected....');

  // await Users.sync();    //optional create users table using schema
} catch (error) {
  console.error(error); 
}

app.use(router);
app.use(express.json())
app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

// app.use('/v1/galleries', galleriesRouter);
app.use('/v1/galleries', galleriesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
