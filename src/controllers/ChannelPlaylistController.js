import Channel from "../Models/Channel";

class ChannelPlaylistController {

    constructor() {
        this.channels = {
            MrSuicideSheep:"UC5nc_ZtjKW1htCVZVRxlQAQ",
            xKito:"UCMOgdURr7d8pOVlc-alkfRg",
            cloudKid:"UCSa8IUd1uEjlREMa21I3ZPQ",
            fireFlyMusic:"UCermf7vqBLEsYL-X_8gBcUg"
        } 
        
        this.createSongsList = this.createSongsList.bind(this);
    }

    async createSongsList(lastDate,channelName) {

        const channelId = this.channels[channelName];
        const channel =  new Channel(channelId,channelName);
        await channel.findUploadsPlaylistId();
        await channel.selectSongs(lastDate)          

        return channel.songs;
    }
}

export default ChannelPlaylistController;
