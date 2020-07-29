import SpotifyClient from "./SpotifyClient";
import queryString from "query-string";
import axios from 'axios';
class TokenHandler {
    static generateBasicAuthToken() {
        const clientId = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET;
        return Buffer.from(clientId + ':' + clientSecret).toString('base64');
    } 

    static async getAccessTokenFromCode(code) {
        
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
            console.log(error);
            return error.response;
        }
    }
    static async test(accessToken) {
        const reqConfig = {
            headers:{
                Authorization:`Bearer ${accessToken}`
            } 
        }
        try {
            const {data:response} = await axios.get('https://api.spotify.com/v1/me',reqConfig);
           
            return true;    
        }catch(error){
            return false;
        }
    }

    static async validateAccessToken(accessToken,refreshToken) {
        
        if (await TokenHandler.test(accessToken)) {
            return "validToken";
        } else {
            let newAccesToken = this.getAccessTokenFromRefreshToken(refreshToken);
            if (newAccesToken) {
                return newAccesToken
            } else {
                return false;
            }
        }
        
    }

    static async getAccessTokenFromRefreshToken(refreshToken) {
        const requestBody = queryString.stringify({
            grant_type:'refresh_token',
            refresh_token: refreshToken
        });
    
        const requestConfig = {
            headers:{
                'Authorization': 'Basic ' + TokenHandler.generateBasicAuthToken(),
                'content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        }
        try {
            let {data:{access_token}} = await axios.post('https://accounts.spotify.com/api/token',requestBody,requestConfig);
            return access_token;

        } catch (error) {
            return false
        }
    }
}

export default TokenHandler;

