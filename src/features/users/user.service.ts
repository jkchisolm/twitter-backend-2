import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllUsers = async () => {
  const users = await prisma.user.findMany({});
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
