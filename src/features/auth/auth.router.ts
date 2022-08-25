import express from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import * as authController from './auth.controller';

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);
router
  .route('/confirm-email')
  .get(authController.sendEmailConfirmation)
  .post(authController.confirmEmail);
router.route('/me').get(requireAuth, authController.getCurrentUser);
router.route('/logout').post(authController.logout);

export default router;
