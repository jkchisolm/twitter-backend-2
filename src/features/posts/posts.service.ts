import { AppDataSource } from '../../data-source';
import Post from '../../entities/Post';
import User from '../../entities/User';

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

const getAllPosts = async () => {
  const posts = await postRepository.find({ relations: ['author'] });
  return posts;
};

const createPost = async (body: string, authorId: number) => {
  const post = new Post();
  post.body = body;
  const author = await userRepository.findOne({ where: { id: authorId } });
  post.author = author!;

  await postRepository.save(post);
  return post;
};

export { getAllPosts, createPost };
