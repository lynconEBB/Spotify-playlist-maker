import createSpotifyRequester from './SpotifyRequester';
import queryString from 'query-string';
import TokenHandler from './TokenHandler';
import connection from '../database/connection';

class SpotifyClient{
    constructor() {
        this.requester;
        this.setRequester =  this.setRequester.bind(this);
    }

    async setRequester(userToken,refreshToken) {
        let response = await TokenHandler.validateAccessToken(userToken,refreshToken);
        
        if(response === "validToken") {
            this.requester = createSpotifyRequester(userToken); 
            return true;      
        }else if(response !== false){
            connection('user')
                .where('refreshToken',refreshToken)
                .update({accessToken:response})
                .then((response)=>{});
            this.requester = createSpotifyRequester(response);
            return true;
        } else {
            return false;
        }
    }

    async getUserProfile() {
        try {
            const response = await this.requester.get('/me');
            return response.data;
        }catch(error) {
            console.log(error);
            return error.response;
        }
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