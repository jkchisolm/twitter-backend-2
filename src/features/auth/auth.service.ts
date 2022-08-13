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

// const registerUser = async (
//   email: string,
//   handle: string,
//   password: string,
//   name: string,
// ) => {
//   bcrypt.hash(password, 12, async (err, hash) => {
//     if (err) {
//       throw err;
//     }
//     const user = await prisma.user.create({
//       data: {
//         email,
//         handle,
//         password: hash,
//         name,
//       },
//     });
//     return user;
//   });
// };

export { loginUser };
