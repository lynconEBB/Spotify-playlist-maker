import createSpotifyRequester from './SpotifyRequester';
import queryString from 'query-string';

class SpotifyClient{
    constructor(userToken) {
        this.requester = createSpotifyRequester(userToken);

    }

    async getUriSongs(songs) {
        
        let uriList = [];
        for(let song of songs) {
            let query = {
                q:`artist:${song.artist} track:${song.name}`,
                type:'track',
                limit:1
            }
            let result = await this.requester.get('/search?'+ queryString.stringify(query));

            if (result.data.tracks.items.length > 0) {
                uriList.push(result.data.tracks.items[0].uri);
            }
            
        }
        return uriList;
    }

    async createPlaylist(req) {
        const body = {
            name: req.name,
            description: req.description,
            public: false
        }
        return await this.requester.post(`users/${req.spotifyId}/playlists`,body);
    }


    async addItems(uriList,playlistId) {
        const body = {
            uris:uriList
        }
        return await this.requester.post(`playlists/${playlistId}/tracks`,body);
    }
}

export default SpotifyClient;