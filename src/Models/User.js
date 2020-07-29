class User {
    constructor(accessToken,refreshToken,name,spotifyId) {
        this.name = name;
        this.accessToken =  accessToken;
        this.refreshToken = refreshToken;
        this.spotifyId =  spotifyId;
    }
    
}
export default User;