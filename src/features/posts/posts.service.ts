import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({});
  return posts;
};

const createPost = async (body: string, authorId: number) => {
  const post = await prisma.post.create({
    data: {
      body,
      authorId
    },
  });
  return post;
};

export { getAllPosts, createPost };
