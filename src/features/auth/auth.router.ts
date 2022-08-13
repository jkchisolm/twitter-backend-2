import express from 'express';
import * as authController from './auth.controller';

const router = express.Router();

router.route('/login').post(authController.login);
