class User {
    constructor(accessToken,refreshToken,name) {
        this.name = name;
        this.accessToken =  accessToken;
        this.refreshToken = refreshToken;
    }
    
}
export default User;