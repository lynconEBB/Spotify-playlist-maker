import connection from '../database/connection';
import User from '../Models/User';
import SpotifyClient from '../services/SpotifyClient';

class UserController {
    constructor() {
        this.login = this.login.bind(this);
    }

    async login(req, res) {
        const spotifyClient =  new SpotifyClient();
        try {
            const tokensGenerated = await spotifyClient.getAccessTokenFromCode(req.query.code);
            
            const userProfile = await spotifyClient.getUserProfile(tokensGenerated.access_token);

            const user = new User(tokensGenerated.access_token,tokensGenerated.refresh_token,userProfile.id);
            
            if ((await this.listByName(user)).length > 0) {
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

    async listByName(user){
        return await connection('user').where('name',user.name);
    }

    async update(user) {
        await connection('user')
        .where('name',user.name)
        .update({
            accessToken: user.accessToken,
            refreshToken: user.refreshToken
        });
    }

    async create(user) {
        await connection('user').insert({
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            name: user.name
        });  
    }  
}

export default UserController;