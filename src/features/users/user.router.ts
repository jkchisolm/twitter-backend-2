import express from 'express';
import * as userController from './user.controller';

const router = express.Router();

router.route('/').get(userController.getAllUsers).put(userController.editUser);

export default router;
