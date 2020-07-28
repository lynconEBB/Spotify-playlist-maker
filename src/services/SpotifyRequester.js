import axios from 'axios';
function createSpotifyRequester(accessToken) {
    const spotifyRequester = axios.create({
        baseURL:'https://api.spotify.com/v1',
        headers:{
            Authorization: `Bearer ${accessToken}` 
        }
    });
    return spotifyRequester;
}


export default createSpotifyRequester;
