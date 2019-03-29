import axios from 'axios';
import store from '../store';
import router from '../router';
import jwt_decode from 'jwt-decode';
import { AUTH_TOKEN_REFRESH } from '@/store/actions/auth';


const apiCall = axios.create()


//const apiCall = axios.create({
//  timeout: 5000,
//  headers: {
//    'Content-Type': 'application/json',
//    'X-CSRFToken': Cookies.get('csrftoken')
//  }
//})


function isTokenExpValid(token) {
  if (token) {
    let decodedToken = jwt_decode(token);
    return (new Date().valueOf() / 1000) <= decodedToken.exp    // or .getTime()
  }
}


async function refreshToken() {
  const data = {
    refresh: store.getters.getRefreshToken
  }
  try {
    const response = await axios.post('/api/auth/jwt/refresh/', data);
    localStorage.setItem('access', response.data.access);
    store.commit(AUTH_TOKEN_REFRESH, response);
    return response.data.access;
  } catch (err) {
    console.log(err);
    return Promise.reject(error)
  }
}


apiCall.interceptors.request.use(async function (config) {

  if (isTokenExpValid(store.getters.getAccessToken)) {
    config.headers.Authorization = `JWT ${store.getters.getAccessToken}`;
    return config;
  }

  if (isTokenExpValid(store.getters.getRefreshToken)) {
    config.headers.Authorization = `JWT ${await refreshToken()}`;
  } else {
    console.log('redirect to log in page');
    router.push('/');
  }

  return config

}, function (error) {
  return Promise.reject(error)
})


export default apiCall;
