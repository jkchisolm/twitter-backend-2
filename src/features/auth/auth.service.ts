import bcrypt from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import User from '../../entities/User';

const userRepository = AppDataSource.getRepository(User);

const loginUser = async (email: string, password: string) => {
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error('Password is incorrect');
  }
  return user;
};

const registerUser = async (
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

export { loginUser, registerUser };
