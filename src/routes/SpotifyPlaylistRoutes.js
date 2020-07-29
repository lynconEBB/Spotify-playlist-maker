import express from 'express';
import SpotifyPlaylistController from '../controllers/SpotifyPlaylistController';

const spotifyPlaylistRouter = express.Router();
const spotifyPlaylistController = new SpotifyPlaylistController();

spotifyPlaylistRouter.post('/spotifyPlaylist',spotifyPlaylistController.create);

export default spotifyPlaylistRouter;