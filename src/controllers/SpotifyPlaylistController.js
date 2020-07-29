import ChannelController from "./ChannelController";
import connection from '../database/connection';
import SpotifyClient from "../services/SpotifyClient";

class SpotifyPlaylistController {

    async create(req,res) {
    
        const {channels,lastDate} = req.body;
        let songs = [];
        const channelController = new ChannelController();

        for (let channel of channels) {
            let channelSongs = await channelController.createSongsList(lastDate, channel);
            
            songs = songs.concat(channelSongs);
        }
        const userAccessToken = "BQDJ0EfAcp6qFIw-jgiieQ6r5NBkWq4Euzk45e9QrKYCIXykW4cT7K6SKS5t44_1lT165YZSXxKprCEHr7H7jcVeuEGkB1gAXR6Fm0VtSinLfD6f2Nw715TCTBQ9CfaDh_hC9bJMzXNcdP1mXKSrWSQrtRP-aftfp8f-pQiJEolkRQ"
        const spotifyClient = new SpotifyClient(userAccessToken);

        const uriList = await spotifyClient.getUriSongs(songs);
        const {data:{id:playlistId}} = await spotifyClient.createPlaylist(req.body);
        const final = await spotifyClient.addItems(uriList,playlistId);

        res.json(final.data);
    }
}

export default SpotifyPlaylistController;