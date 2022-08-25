import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as userService from './user.service';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).send(users);
};

const editUser = async (req: Request, res: Response) => {
  const { email, name, handle, password } = req.body;
  let hashedPassword: string = '';
  if (password) {
    hashedPassword = await bcrypt.hash(password, 12);
  }
  const user = await userService.editUser(
    email,
    name,
    handle,
    hashedPassword,
    Number(req.params.id),
  );
  res.status(201).send(user);
};
export { getAllUsers, editUser };
