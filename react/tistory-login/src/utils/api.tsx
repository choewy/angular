import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const request = () => {
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${cookie.get('accessToken')}`,
    },
  });
  return api;
};

export const api = {
  axios: request(),
};
