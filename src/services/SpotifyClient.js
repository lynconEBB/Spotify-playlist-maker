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
                q:song.title,
                type:'track',
                limit:1
            };
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
        let steps = uriList.length/100;
        if (!Number.isInteger(steps)) {
            steps = parseInt(steps) + 1;
        }

        for(let i = 0; i<steps; i++ ) {
            let body;
            if (i === steps-1) {
                body = {
                    uris:uriList.slice(i*100,uriList.length)
                }
            } else {
                body = {
                    uris:uriList.slice(i*100,(i*100)+100)
                }
            }
           
            await this.requester.post(`playlists/${playlistId}/tracks`,body);
        }

        return {status:"tudo certo"};
        
    }
}

export default SpotifyClient;