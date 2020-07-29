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
            key:process.env.API_KEY,
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

                if (song.title.includes('-')) {
                    
                    let [artist,songName] = this.extractNameAndArtist(song.title); 
                    
                    let formatedSong = new Song(artist,songName,song.publishedAt);
                    
                    if (formatedSong.publicationDate < formatedLastDate) {
                        reachLastDate = true;
                        break;
                    } else {
                        this.songs.push(formatedSong);
                    }
                }
            }    

            nxtToken = nextPageToken;
          
        }while (!reachLastDate);
    }


    extractNameAndArtist(title) {
    
        let [artist,songName] = title.split('-'); 
                    
        artist = artist.replace('&',' ');
        artist = artist.replace("'",'');
        artist = artist.replace(",",' ');
        artist = artist.replace(/\sx\s/,' ');

        songName = songName.replace(/'/g,'');
        
        
        let name,featuring = '';
        
        if (songName.includes('(')) {
            [name,featuring] = songName.split('(');
            featuring = featuring.replace('ft.' ,'');
            featuring = featuring.replace('feat.' ,'');
            featuring = featuring.replace('prod. by' ,'');
            featuring = featuring.replace('with' ,'');
            featuring = featuring.replace(')' ,'');

            artist = artist + featuring;
            songName = name;
        }
        if (songName.includes('ft.')) {
            [name,featuring] = songName.split('ft.');
            artist = artist + featuring;
            songName = name;
        }
        if (songName.includes('feat.')) {
            [name,featuring] = songName.split('feat.');
            artist = artist + featuring;
            songName = name;
        }
        if (name == undefined) {
            
            return [artist.trim(),songName.trim()];
        }
        return [artist.trim(),name.trim()];
    }

}

export default Channel;

