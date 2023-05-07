import express from 'express';
import bodyParser  from 'body-parser';
import router from './src/routes/index.js';

const port = process.env.PORT || 3000;
const app = express();
const galleriesRouter = require('./src/routes/galleries.route');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use(router);

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
