import express from 'express';
import UserController from './controllers/UserController';
import PlaylistController from './controllers/PlaylistController';

const router = express.Router();
const userController = new UserController();

router.get('/callback',userController.login);

router.post('/playlists',PlaylistController.create);

export default router;