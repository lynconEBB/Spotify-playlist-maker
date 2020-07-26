import axios from 'axios';
import queryString from 'query-string';
import connection from '../database/connection';
import generateAuth from '../services/generateAuth';

export default class UserController {
    constructor() {

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
            
            await connection('user').insert({
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token,
                name: 'lyncon'
            });

            res.cookie('accessToken',response.data.access_token);
            res.redirect('http://localhost:3000/main');
            
        } catch (error) {

            console.log(error);
            res.send(error);
        }
        
       
    }


    
}