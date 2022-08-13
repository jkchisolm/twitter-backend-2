import { AppDataSource } from '../../data-source';
import User from '../../entities/User';

const userRepository = AppDataSource.getRepository(User);

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
  const user = new User();
  user.email = email;
  user.handle = handle;
  user.name = name;
  user.password = password;
  await userRepository.save(user);
  return user;
};

const editUser = async (
  email: string,
  name: string,
  handle: string,
  password: string,
  id: number,
) => {
  const user = await userRepository.findOne({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  user.email = email;
  user.handle = handle;
  user.name = name;
  user.password = password;
  await userRepository.save(user);
  return user;
};

export { getAllUsers, register, editUser };
