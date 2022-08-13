import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as userService from './user.service';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).send(users);
};

const register = async (req: Request, res: Response) => {
  const { email, name, handle, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await userService.register(email, name, handle, hashedPassword);
  res.status(201).send(user);
};

export { getAllUsers, register };
