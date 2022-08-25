import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as authService from './auth.service';
import * as userService from '../users/user.service';
import { generateToken } from '../../utils/jwt';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUser(email, password);
    if (user) {
      // generate access and refresh JWTs
      const accessToken = generateToken(user.id, '30m');
      const refreshToken = generateToken(user.id, '7d');

      // store refreshToken in postgres refreshToken table
      const result = await authService.storeRefreshToken(refreshToken, user.id);
      if (!result.success) {
        return res.status(400).send('Something went wrong.');
      }

      // set access and refresh tokens in cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.PROD === 'true',
        maxAge: 1000 * 60 * 30,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.PROD === 'true',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      // @ts-ignore
      req.user = user.id;

      // send user back
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
      // generate access and refresh JWTs
      const accessToken = generateToken(user.id, '30m');
      const refreshToken = generateToken(user.id, '7d');

      // store refreshToken in postgres refreshToken table
      const result = await authService.storeRefreshToken(refreshToken, user.id);
      if (!result.success) {
        return res.status(400).send('Something went wrong.');
      }

      // set access and refresh tokens in cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.PROD === 'true',
        maxAge: 1000 * 60 * 30,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.PROD === 'true',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      // @ts-ignore
      req.user = user.id;

      // send user back
      return res.status(200).send(user);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const logout = (req: Request, res: Response) => {
  // remove access and refresh tokens from cookie
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.status(200).send('Logged out');
};

const getCurrentUser = async (req: Request, res: Response) => {
  // get user from req.user
  // @ts-ignore
  const { userId } = req.user;

  // get user from postgres
  const user = await userService.getUserById(userId);

  if (user) {
    return res.status(200).send(user);
  }
  return res.status(400).send('User not found');
};

const sendEmailConfirmation = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    // check if user already exists
    const user = await userService.getUserByEmail(email);
    if (user) {
      return res.status(400).send('User already exists');
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const confirmEmail = () => {};

export {
  login,
  register,
  getCurrentUser,
  sendEmailConfirmation,
  confirmEmail,
  logout,
};
