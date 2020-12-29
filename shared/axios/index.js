import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: {
    'x-api-key': 'my_key',
  },
});

export default instance;
