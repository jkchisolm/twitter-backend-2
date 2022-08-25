import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { generateToken, verifyToken } from '../utils/jwt';
import * as authService from '../features/auth/auth.service';

// deserializeuser
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyToken(accessToken);

  if (payload) {
    // valid access token
    // @ts-ignore
    req.user = payload;
    return next();
  }

  // access token is valid, but expired
  const { payload: refresh } =
    expired && refreshToken ? verifyToken(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  // check if refresh token is in our DB
  const { id } = refresh as JwtPayload;
  const result = await authService.getRefreshToken(id);
  if (!result) {
    return next();
  }

  // refresh token is in our DB, so generate new access token and refresh token
  const { user_id: userId } = result;
  const newAccessToken = generateToken(Number(userId), '30m');
  const newRefreshToken = generateToken(Number(userId), '7d');

  // set new access token in cookie
  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.PROD === 'true',
    maxAge: 1000 * 60 * 30,
  });

  // set new refresh token in cookie
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.PROD === 'true',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  // @ts-ignore
  req.user = refresh;
  return next();
};

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  return next();
};

export { deserializeUser, requireAuth };
