import ChannelPlaylistController from "./ChannelPlaylistController";
import connection from '../database/connection';
import SpotifyClient from "../services/SpotifyClient";
import UserController from "./UserController";

class SpotifyPlaylistController {

    async create(req,res) {

        const {channels,lastDate,spotifyId} = req.body;
        const userController = new UserController();
        const user = await userController.listBySpotifyId(spotifyId);
        
        if (user != undefined) {
            const spotifyClient = new SpotifyClient();

            if (await spotifyClient.setRequester(user.accessToken,user.refreshToken)) {
                
                const channelPlaylistController = new ChannelPlaylistController(); 
                let songs = [];

                for (let channel of channels) {
                    let channelSongs = await channelController.createSongsList(lastDate, channel);
                    
                    songs = songs.concat(channelSongs);
                }

                /*const uriList = await spotifyClient.getUriSongs(songs);
                const {data:{id:playlistId}} = await spotifyClient.createPlaylist(req.body);
                const final = await spotifyClient.addItems(uriList,playlistId);

                res.json(final.data);*/
                res.send("chegou no fim");

            } else {
                res.status(400).send("Refresh Token Invalid, login again");
            }
        } else {
            res.status(404).send("User not Found")
        }

    }
}

export default SpotifyPlaylistController;