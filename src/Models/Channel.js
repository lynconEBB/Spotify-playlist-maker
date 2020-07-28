import youtubeRequester from "../services/YoutubeRequester";
import queryString from "query-string";
import Song from "./Song";

class Channel {
    constructor(id,name) {
        this.id = id;
        this.name = name;
        this.uploadsPlaylistId;
        this.songs = [];

        this.findUploadsPlaylistId = this.findUploadsPlaylistId.bind(this);
        this.selectSongs = this.selectSongs.bind(this);
    }

    async findUploadsPlaylistId() {
        const channelData = await youtubeRequester.get('/channels?'+ queryString.stringify({
            key:'AIzaSyCe9T3-7NwlEkAgupO2x9bwBg443sxVEOo',
            id:this.id,
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

        this.uploadsPlaylistId = uploads;
    }

    async requestSongs(nextPageToken = false) {
        const query = {
            part:'snippet',
            maxResults: 50,
            playlistId: this.uploadsPlaylistId,
            key:'AIzaSyCe9T3-7NwlEkAgupO2x9bwBg443sxVEOo',
            fields: 'items(snippet/publishedAt,snippet/title),nextPageToken'
        };

        if (nextPageToken) {
            query.pageToken = nextPageToken;
        }

        return await youtubeRequester('playlistItems?' + queryString.stringify(query)); 
        
    }

    async selectSongs(lastDate) {
        let formatedLastDate = new Date(lastDate);
        
        let reachLastDate = false;
        let nxtToken = false;

        do {
          
            const {data:{items:songs, nextPageToken}} = await this.requestSongs(nxtToken);
            
            for (let wrapper of songs) {
                let { snippet:song } = wrapper;
                
                let formatedSong = new Song(song.title,song.publishedAt);

                if (formatedSong.publicationDate < formatedLastDate) {
                    reachLastDate = true;
                    break;
                } else {
                    this.songs.push(formatedSong);
                }
            }

            nxtToken = nextPageToken;
          
        }while (!reachLastDate);
    }
}

export default Channel;