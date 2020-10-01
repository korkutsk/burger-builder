import axios from 'axios';

// TODO update base_url
const instance = axios.create({
    baseURL: '[base_url]'
});

export default instance;