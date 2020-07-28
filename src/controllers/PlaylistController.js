import ChannelController from "./ChannelController";
import connection from '../database/connection';
import SpotifyClient from "../services/SpotifyClient";

class PlaylistController {

    async create(req,res) {
    
        const {channels,lastDate} = req.body;
        let songs = [];
        const channelController = new ChannelController();

        for (let channel of channels) {
            let channelSongs = await channelController.createSongsList(lastDate, channel);
            
            songs = songs.concat(channelSongs);
        }
        const userAccessToken = "BQAkKK7TPwmnFDEqfJ4XiCZqo_ObgYzB7mXTM3LzbTiFJjtND59XZIXw4ivFZo7DeCrokw-cjkdYL9tEYQD2w-NT81rHA40uOgGNlJiXFFJgD0MaUYLwvswGonPS4KF6PDSyLcYeODjujd7HMI2GK54IpQps2-kOFCuDjMZm7qLSjQ";
        const spotifyClient = new SpotifyClient(userAccessToken);

        const uriList = await spotifyClient.getUriSongs(songs);
        const {data:{id:playlistId}} = await spotifyClient.createPlaylist(req.body);
        const final = await spotifyClient.addItems(uriList,playlistId);

        res.json(final.data);
    }
}

export default new PlaylistController();