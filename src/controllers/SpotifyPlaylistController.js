import ChannelController from "./ChannelController";
import SpotifyClient from "../services/SpotifyClient";
import UserController from "./UserController";

class SpotifyPlaylistController {
    constructor() {
        this.create =  this.create.bind(this);
    }

    async create(req,res) {

        const {channels,lastDate,spotifyId} = req.body;
        const userController = new UserController();
        const user = await userController.listBySpotifyId(spotifyId);
        let channelsFormated = [];
        if (user != undefined) {
            const spotifyClient = new SpotifyClient();

            if (await spotifyClient.setRequester(user.accessToken,user.refreshToken)) {

                const channelController = new ChannelController(); 
                for (let channel of channels) {
                    let formatedChannel = await channelController.create(channel,lastDate);
                    channelsFormated.push(formatedChannel);
                }
                
                let sortedSongs = this.sortSongsList(channelsFormated);

                const uriList = await spotifyClient.getUriSongs(sortedSongs);
                
                const {data:{id:playlistId}} = await spotifyClient.createPlaylist(req.body);
                const final = await spotifyClient.addItems(uriList,playlistId);
                
                res.json(final.data);

            } else {
                res.status(400).send("Refresh Token Invalid, login again");
            }
        } else {
            res.status(404).send("User not Found")
        }

    }

    sortSongsList(channels) {
        let sortedSongs = [];
        for(let channel of channels) {
            sortedSongs = sortedSongs.concat(...channel.playlist.songs);
        }
        return [...new Set(sortedSongs)];
    }
}

export default SpotifyPlaylistController;