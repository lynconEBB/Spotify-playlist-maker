export default function generateAuth() {
    const clientId = 'cc246ac4396a407fa5af8ba81e22e21b';
    const clientSecret = 'f32f6b69b1af49588e941fdd4addfdfc';
    return Buffer.from(clientId + ':' + clientSecret).toString('base64');
}
