import express from "express";
import db from './src/configs/db.config.js';
import router from "./src/routes/index.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// import { Users } from './src/models/users.model.js';
// import { Galleries } from './src/models/galleries.model.js';
//import { Programs } from "./src/models/programs.model.js";

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// //connect to database
// try {
//   // db.authenticate();
//   console.log('Database Connected....');

//   /* optional create users table using schema */
//   // await Users.sync(); 
//   // await Galleries.sync(); 
//   // await Programs.sync();
// } catch (error) {
//   console.error(error); 
// }

app.use(router);
app.use(express.json())
app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

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
