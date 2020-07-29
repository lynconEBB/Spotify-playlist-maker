import express from 'express';
import cookies from 'cookie-parser'
import bodyParser from 'body-parser';
import userRouter from './routes/UserRoutes';
import spotifyPlaylistRouter from './routes/SpotifyPlaylistRoutes';

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookies());

app.use(spotifyPlaylistRouter);
app.use(userRouter);

app.listen(3030,() => {
    console.log("Server ouvindo na porta 3030");
});



