import axios from "axios";

export default class SpotifyResourcesGetter {
    static async getUserProfile(user) {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me',{
                headers:{
                    Authorization:`Bearer ${user.accessToken}`
                }
            });
            return response.data;

        }catch(error) {
            return error;
        }
         
    }
}