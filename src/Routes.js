import express from 'express';
import UserController from './controllers/UserController';

const router = express.Router();
const userController = new UserController();

router.get('/callback',userController.login)

export default router;