import ChannelController from "./ChannelController";
import SpotifyClient from "../services/SpotifyClient";
import UserController from "./UserController";

class SpotifyPlaylistController {

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
                console.log(channelsFormated);
                console.log(channelsFormated[0].playlist.songs);
                /*let songs = [];

                for (let channel of channels) {
                    let channelSongs = await channelController.createSongsList(lastDate, channel);
                    
                    songs = songs.concat(channelSongs);
                }*/

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