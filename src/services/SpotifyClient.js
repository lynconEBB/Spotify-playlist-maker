import createSpotifyRequester from './SpotifyRequester';
import queryString from 'query-string';
import TokenHandler from './TokenHandler';
import axios from 'axios';
class SpotifyClient{
    constructor(userToken) {
        this.requester = createSpotifyRequester(userToken);
    }

    async getUserProfile(accessToken) {
        const requestConfig = {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }
        try {
            const response = await axios.get('https://api.spotify.com/v1/me',requestConfig);
            return response.data;
        }catch(error) {
            return error.response;
        }
    }

    async getAccessTokenFromCode(code) {
        const requestBody = queryString.stringify({
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type:'authorization_code'
        });
        const requestConfig = {
            headers:{
                'Authorization': 'Basic ' + TokenHandler.generateBasicAuthToken(),
                'content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        }
        try {
            let {data:responseBody} = await axios.post('https://accounts.spotify.com/api/token',requestBody,requestConfig);
       
            return responseBody;

        } catch (error) {

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