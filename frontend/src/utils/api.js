import axios from 'axios';
import store from '../store';
import router from '../router';
import jwt_decode from 'jwt-decode';
import { AUTH_TOKEN_REFRESH, AUTH_LOGOUT } from '@/store/actions/auth';



const apiCall = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
//    'X-CSRFToken': Cookies.get('csrftoken')
  }
})


function tokensExist() {
  return localStorage.getItem('access') === store.getters.getAccessToken &&
         localStorage.getItem('refresh') === store.getters.getRefreshToken
}


// Currently unused - RM, 18.05.2019
//function isTokenExpValid(token) {
//  if (token) {
//    let decodedToken = jwt_decode(token);
//    return (new Date().valueOf() / 1000) <= decodedToken.exp    // or .getTime()
//  }
//}


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
    return Promise.reject(err)
  }
}


async function verifyToken(token) {
  const data = {
    token: token
  }
  try {
    const response = await axios.post('/api/auth/jwt/verify/', data);
//    console.log('verifyToken returning: ', response.status)
    return response.status;
  } catch (err) {
//    console.error('verifyToken: ', err);
  }
}


apiCall.interceptors.request.use(async function (config) {
  if (!tokensExist()) {
    return config
  } else {
    if(await verifyToken(store.getters.getAccessToken) === 200) {
//      console.log('verifyToken: getAccessToken OK!');
      config.headers.Authorization = `JWT ${store.getters.getAccessToken}`;
      return config;
    } else {
//      console.log('Trying to refresh token...')
      if(await verifyToken(store.getters.getRefreshToken) === 200) {
//          console.log('verifyToken: getRefreshToken OK!')
          config.headers.Authorization = `JWT ${await refreshToken()}`;
      } else {
        store.dispatch(AUTH_LOGOUT);
        router.push('/');
      }
    }
  }
  return config

}, function (error) {
  return Promise.reject(error)
})


apiCall.interceptors.response.use(function (config) {
  return config
}, function (error) {
  if (error.request !== undefined) {
    if (error.request.responseURL.includes('/jwt/create/')) {
      return Promise.reject(error)
    }
  }
  if (error.request !== undefined && (error.request.responseURL.includes('refresh') ||
      error.request.status === 401 && error.config.__isRetryRequest)) {
    store.dispatch(AUTH_LOGOUT);
    router.push({name: 'UserAuth'})
  } else if (error.request !== undefined && error.request.status === 401) {
    error.config.__isRetryRequest = true
    return apiCall.request(error.config)
  }
  return Promise.reject(error)
})


export default apiCall;
