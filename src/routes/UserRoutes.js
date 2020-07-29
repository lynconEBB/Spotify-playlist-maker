import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/user/login',userController.login);
userRouter.get('/user/auth',userController.login);

export default userRouter;