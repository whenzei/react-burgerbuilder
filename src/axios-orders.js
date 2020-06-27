import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-9ee28.firebaseio.com/'
});

export default instance;