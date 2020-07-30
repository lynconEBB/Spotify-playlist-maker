import ChannelPlaylistController from "./ChannelPlaylistController";
import youtubeRequester from '../services/YoutubeRequester';
import Channel from '../Models/Channel';
import queryString from 'query-string';

class ChannelController {
    constructor() {
        this.channels = {
            MrSuicideSheep:"UC5nc_ZtjKW1htCVZVRxlQAQ",
            xKito:"UCMOgdURr7d8pOVlc-alkfRg",
            cloudKid:"UCSa8IUd1uEjlREMa21I3ZPQ",
            fireFlyMusic:"UCermf7vqBLEsYL-X_8gBcUg"
        }  

        this.create =  this.create.bind(this);
    }

    async create(name,lastDate) {
        const id = this.channels[name];
        const channel =  new Channel(name,id);

        const channelPlaylistId = await this.findUploadsPlaylistIdOfChannel(channel.id);
        const channelPlaylistController = new ChannelPlaylistController();
        const channelPlaylist = await channelPlaylistController.create(channelPlaylistId,lastDate,Channel);

        channel.playlist = channelPlaylist;
        return channel;
    }



    async findUploadsPlaylistIdOfChannel(id) {
        const channelData = await youtubeRequester.get('/channels?'+ queryString.stringify({
            key:'AIzaSyCe9T3-7NwlEkAgupO2x9bwBg443sxVEOo',
            id:id,
            part:'contentDetails',
            fields:'items/contentDetails/relatedPlaylists/uploads'
        }));
        
        const {
            data:{
                items: [
                    item
                ]
            }
        } = channelData;

        const { 
            contentDetails:{
                relatedPlaylists:{
                    uploads
                }
            }
        } = item;

        return uploads;
    }

}

export default ChannelController;