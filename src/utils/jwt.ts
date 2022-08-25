import jwt, { Secret } from 'jsonwebtoken';

export const generateToken = (userId: number, expiresIn: string | number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
    expiresIn,
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as Secret);
    return { payload, expired: false };
  } catch (error) {
    return {
      payload: null,
      expired: error.message.includes('jwt expired') as boolean,
    };
    // if (error instanceof Error) {
    //   return { payload: null, expired: error.message.includes('jwt expired') };
    // }
  }
};
