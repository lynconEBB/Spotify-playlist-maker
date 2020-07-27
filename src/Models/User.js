export default class User {
    constructor(accessToken,refreshToken,name=null) {
        this.name = name;
        this.accessToken =  accessToken;
        this.refreshToken = refreshToken;
    }
    
}