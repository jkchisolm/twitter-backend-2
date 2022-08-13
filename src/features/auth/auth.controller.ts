import { Request, Response } from 'express';
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
  res.send('Register');
};

export { login, register };
