import { Request, Response } from 'express';
import * as userService from './user.service';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).send(users);
};

const register = async (req: Request, res: Response) => {
  const { email, name, handle, password } = req.body;
  const user = await userService.register(email, name, handle, password);
  res.status(201).send(user);
};

export { getAllUsers, register };
