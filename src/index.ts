import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import swaggerUI, { JsonObject } from 'swagger-ui-express';
import yaml from 'js-yaml';
import postRouter from './features/posts/posts.router';
import userRouter from './features/users/user.router';
import authRouter from './features/auth/auth.router';
import { AppDataSource } from './data-source';
import { deserializeUser } from './middleware/auth.middleware';

const app = express();

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, '../../openapi.yaml'), 'utf8'),
) as JsonObject;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.all('*').use(deserializeUser);

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server listening on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
