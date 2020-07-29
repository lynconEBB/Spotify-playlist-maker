class TokenHandler {
    static generateBasicAuthToken() {
        const clientId = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET;
        return Buffer.from(clientId + ':' + clientSecret).toString('base64');
    } 
}

export default TokenHandler;