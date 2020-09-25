import axios from 'axios';

// Upade babaseURL property
const instance = axios.create({
    baseURL: 'your base url'
});

export default instance;