import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as authService from './auth.service';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUser(email, password);
    if (user) {
      // set user information in session
      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        handle: user.handle,
      };
      return res.status(200).send(user);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const register = async (req: Request, res: Response) => {
  const { email, name, handle, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await authService.registerUser(
      email,
      name,
      handle,
      hashedPassword,
    );
    if (user) {
      // set user information in session
      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        handle: user.handle,
      };
      return res.status(201).send(user);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getCurrentUser = (req: Request, res: Response) => {
  if (req.session.user) {
    return res.status(200).send(req.session.user);
  }
  return res.status(400).send('No user found');
};

export { login, register, getCurrentUser };
