import axios from 'axios';
import queryString from 'query-string';
import connection from '../database/connection';
import generateAuth from '../services/generateAuth';
import User from '../Models/User';
import SpotifyResourcesGetter from '../services/SpotyResourcesGetter';

export default class UserController {
    constructor() {
        this.login = this.login.bind(this);
    }

    async login(req, res) {

        const requestData = queryString.stringify({
            code: req.query.code,
            redirect_uri: 'http://localhost:3030/callback',
            grant_type:'authorization_code'
        });
        const requestConfig = {
            headers:{
                'Authorization': 'Basic ' + generateAuth(),
                'content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        }

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token',requestData,requestConfig);
            
            const user = new User(response.data.access_token,response.data.refresh_token);

            

            const userProfile = await SpotifyResourcesGetter.getUserProfile(user);

            user.name = userProfile.id;

            await this.create(user);

            res.cookie('spotifyId',user.name);
            res.redirect('http://localhost:3000/main');
            
        } catch (error) {

            console.log(error);
            res.send(error);
        }
        
    }

    async create(user) {
        const resultUser = await connection('user').where('name',user.name);

        if (resultUser.length == 0) {
            await connection('user').insert({
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
                name: user.name
            });
        } else {
            console.log(user);

            await connection('user')
                .where('name',user.name)
                .update({
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken
                });
        }
    }
    
}