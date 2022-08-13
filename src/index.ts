import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import postRouter from './features/posts/posts.router';
import userRouter from './features/users/user.router';
import { AppDataSource } from './data-source';

declare module 'express-session' {
  // eslint-disable-next-line no-unused-vars
  interface SessionData {
    user: {
      id: number;
      email: string;
      name: string;
      handle: string;
    };
  }
}

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  connectTimeout: 10000,
  lazyConnect: true,
  tls: { rejectUnauthorized: false },
});
const RedisStore = connectRedis(session);
const app = express();

app.use(express.json());
app.use(
  session({
    store: new RedisStore({ client: redis }),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use('/posts', postRouter);
app.use('/users', userRouter);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server listening on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
