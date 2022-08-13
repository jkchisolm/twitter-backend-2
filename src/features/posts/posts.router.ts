import express from 'express';
import * as postController from './posts.controller';

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

export default router;
