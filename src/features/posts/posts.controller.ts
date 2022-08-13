import { Request, Response } from 'express';
import * as postService from './posts.service';

const getAllPosts = async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  res.status(200).send(posts);
};

const createPost = async (req: Request, res: Response) => {
  const { body, authorId } = req.body;
  const post = await postService.createPost(body, authorId);
  res.status(201).send(post);
};

export { getAllPosts, createPost };
