import { PrismaClient } from '@prisma/client';
import { AppDataSource } from '../../data-source';
import User from '../../entities/User';

const userRepository = AppDataSource.getRepository(User);

const prisma = new PrismaClient();

const getAllUsers = async () => {
  const users = await userRepository.find();
  return users;
};

const register = async (
  email: string,
  name: string,
  handle: string,
  password: string,
) => {
  const user = await prisma.user.create({
    data: {
      email,
      name,
      handle,
      password,
    },
  });
  return user;
};

export { getAllUsers, register };
