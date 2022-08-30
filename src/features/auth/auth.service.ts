import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import sgMail, { ResponseError } from '@sendgrid/mail';
import { AppDataSource } from '../../data-source';
import RefreshToken from '../../entities/RefreshToken';
import User from '../../entities/User';
import VerificationCode from '../../entities/VerificationCode';

const userRepository = AppDataSource.getRepository(User);
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
const VerificationCodeRepository =
  AppDataSource.getRepository(VerificationCode);
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// const credentials = {
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// };

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
  },
} as SMTPTransport.Options);

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

const registerUser = async (
  email: string,
  name: string,
  handle: string,
  password: string,
) => {
  const user = new User();
  user.email = email;
  user.handle = handle;
  user.name = name;
  user.password = password;
  await userRepository.save(user);
  return user;
};

const storeRefreshToken = async (token: string, userId: number) => {
  // hash token before storing
  const hashedToken = await bcrypt.hash(token, 12);

  // check if user already has token
  const existingToken = await refreshTokenRepository.findOne({
    where: { user_id: String(userId) },
  });

  if (existingToken) {
    // update token
    existingToken.token = hashedToken;
    existingToken.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    await refreshTokenRepository.save(existingToken);
    return { success: true, message: 'Token updated' };
  }
  const refreshToken = new RefreshToken();
  refreshToken.token = hashedToken;
  refreshToken.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  refreshToken.user_id = String(userId);
  await refreshTokenRepository.save(refreshToken);
  return { success: true, message: 'Token updated' };
};

const getRefreshToken = async (userId: number) => {
  const token = await refreshTokenRepository.findOne({
    where: { user_id: String(userId) },
  });
  if (!token) {
    return null;
  }
  return token;
};

const sendConfirmationEmail = async (email: string) => {
  const code = new VerificationCode();
  code.code = Math.floor(Math.random() * 1000000).toString();
  code.type = 'Register';
  VerificationCodeRepository.save(code);

  const msg = {
    to: email,
    from: 'mail@server.joshuachisolmserver.com',
    subject: 'Confirm your email',
    text: `Your confirmation code is ${code.code}`,
    html: `<strong>Your confirmation code is ${code.code}</strong>`,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((err: ResponseError) => {
      console.error(err.response.body);
    });
};

const verifyEmailConfirmation = async (code: string) => {
  const verificationCode = await VerificationCodeRepository.findOne({
    where: { code, type: 'Register' },
  });
  if (!verificationCode) {
    return false;
  }
  // destroy code after use
  await VerificationCodeRepository.delete(verificationCode.id);
  return verificationCode;
};

export {
  loginUser,
  registerUser,
  storeRefreshToken,
  getRefreshToken,
  sendConfirmationEmail,
  verifyEmailConfirmation,
};
