import express from 'express';
import postRouter from './features/posts/posts.router';
import userRouter from './features/users/user.router';

const app = express();

app.use(express.json());

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log('Server listening on port 4000');
});
