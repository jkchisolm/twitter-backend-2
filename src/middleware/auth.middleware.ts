import { Request, Response, NextFunction } from 'express';

// middleware to check if user is authenticated
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    return next();
  }
  return res.status(401).send('Unauthorized');
};

export default isAuthenticated;
