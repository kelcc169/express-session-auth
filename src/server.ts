import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ExpressSession from 'express-session';
import helmet from 'helmet';

const passport = require('./config/passportConfig');
const db = require('./models');

const app = express();

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(express.static(__dirname + '/../client/build'))

app.use(ExpressSession({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

import authRouter from './routes/auth';
app.use('/auth', authRouter)

import apiRouter from './routes/api';
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile('index.html')
})

app.listen(process.env.PORT || 3001);