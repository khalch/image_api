require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const CronJob = require('./app/Services/synchronization');


app.use(cors());
app.options('*', cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.raw());

app.use(require('./routes/web'));

app.listen(process.env.APP_PORT, () => {
  console.log(`api listening on ${process.env.APP_PORT}port`);
});
