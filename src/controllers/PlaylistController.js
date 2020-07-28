import ChannelController from "./ChannelController";

class PlaylistController {
    constructor() {
        
        
    }

    async create(req,res) {
    
        const {channels,lastDate} = req.body;
        let playlist = [];
        const channelController = new ChannelController();

        for (let channel of channels) {
            let channelSongs = await channelController.createSongsList(lastDate, channel);
            
            playlist = playlist.concat(channelSongs);
        }

        res.json({
            length:playlist.length,
            data: playlist
        });
    }
}

export default new PlaylistController();