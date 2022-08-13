import express from 'express';
import * as userController from './user.controller';

const router = express.Router();

router.route('/').get(userController.getAllUsers).put(userController.editUser);
router.route('/register').post(userController.register);

export default router;
