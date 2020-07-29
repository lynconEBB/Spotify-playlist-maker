import connection from '../database/connection';
import User from '../Models/User';
import SpotifyClient from '../services/SpotifyClient';
import TokenHandler from '../services/TokenHandler';

class UserController {
    constructor() {
        this.login = this.login.bind(this);
    }

    async login(req, res) {
        
        try {
            const tokensGenerated = await TokenHandler.getAccessTokenFromCode(req.query.code);
           
            const spotifyClient =  new SpotifyClient();
            await spotifyClient.setRequester(tokensGenerated.access_token,tokensGenerated.refresh_token);

            const userProfile = await spotifyClient.getUserProfile();
            
            const user = new User(tokensGenerated.access_token,tokensGenerated.refresh_token,userProfile.display_name,userProfile.id);
            
            if ((await this.listBySpotifyId(user.spotifyId)) != undefined) {
                await this.update(user);
            } else {
                await this.create(user);
            }
            res.cookie('spotifyId',user.name);
            res.redirect('http://localhost:3000/main');
            
        } catch (error) {
            res.send(error.response);
        }
        
    }

    async listBySpotifyId(spotifyId){
        return await connection('user').where('spotifyId',spotifyId).first();
    }

    async update(user) {
        await connection('user')
        .where('spotifyId',user.spotifyId)
        .update({
            accessToken: user.accessToken,
            refreshToken: user.refreshToken
        });
    }

    async create(user) {
        await connection('user').insert({
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            name: user.name,
            spotifyId: user.spotifyId
        });  
    }  
    async check(req,res) {
        
    }

}

export default UserController;