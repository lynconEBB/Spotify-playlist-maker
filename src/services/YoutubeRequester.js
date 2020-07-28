const { default: Axios } = require("axios");

import axios from 'axios';

const youtubeRequester = axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3/',
})

export default youtubeRequester;