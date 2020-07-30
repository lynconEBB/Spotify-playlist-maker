import ChannelPlaylist from "../Models/ChannelPlaylist";
import StringExtractor from "../services/StringExtractor";
import queryString from "query-string";
import youtubeRequester from '../services/YoutubeRequester';
import Song from '../Models/Song';
class ChannelPlaylistController {
    constructor() {
        this.create = this.create.bind(this);

    }

    async create(id,lastDate,channel) {
        let formatedLastDate = new Date(lastDate);
        let reachLastDate = false;
        let nxtToken = false;
        const stringExtractor =  new StringExtractor();
        let formatedSongs = [];

        do {
          
            const {data:{items:songs, nextPageToken}} = await this.requestSongs(nxtToken,id);
            for (let wrapper of songs) {
                let { snippet:song } = wrapper;

                if (song.title.includes('-')) {
                    
                    //let [artist,songName] = stringExtractor.extractNameAndArtist(song.title,channel.name); 
                    
                    let formatedSong = new Song(song.title,song.title,song.publishedAt);
                    
                    if (formatedSong.publicationDate < formatedLastDate) {
                        reachLastDate = true;
                        break;
                    } else {
                        formatedSongs.push(formatedSong);
                    }
                }
            }    

            nxtToken = nextPageToken;
          
        }while (!reachLastDate);

        return new ChannelPlaylist(id,formatedSongs);
    }

    async requestSongs(nextPageToken,id) {
        const query = {
            part:'snippet',
            maxResults: 50,
            playlistId: id,
            key:process.env.API_KEY,
            fields: 'items(snippet/publishedAt,snippet/title),nextPageToken'
        };

        if (nextPageToken) {
            query.pageToken = nextPageToken;
        }

        return await youtubeRequester('playlistItems?' + queryString.stringify(query)); 
    }


}

export default ChannelPlaylistController;
