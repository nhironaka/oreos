import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import env from 'dotenv';

import { initializeStorage } from './util/storage';
import { initializePassport } from './util/passport';
import index from './api/index';
import authApi from './api/auth';
import userApi from './api/user';

env.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
initializeStorage(app);
initializePassport(app);

app.use('/auth', authApi);
app.use('/user', userApi);
app.use(index);

export default app;
