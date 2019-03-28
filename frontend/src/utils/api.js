import axios from 'axios';
import store from '../store';
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


function getAuthToken () {
  console.log('getAuthToken function');
  return 'new token';
}

apiCall.interceptors.request.use(async function (config) {

  if (store.getters.access_token_exp) {
    config.headers.Authorization = `JWT ${store.getters.get_jwt_access_token}`;
  }
  if (store.getters.refresh_token_exp) {
    console.log('refresh_token_exp OK');
    config.headers.Authorization = await getAuthToken();
  }
  return config

}, function (error) {
  return Promise.reject(error)

})

export default apiCall;



// JUST EXAMPLE:
//
//axios.interceptors.request.use(async function (config) {
//  // If not one of these specific pages that doesn't need a token, use method to get the current token or request a new one.  Otherwise, use current token (possibly none)
//  if (!config.url.includes('login') && !config.url.includes('refresh') && !config.url.includes('forgot_password') && !config.url.includes('reset_password') && !config.url.includes('activate')) {
//    config.headers['Authorization'] = 'Bearer ' + await getAuthToken()
//  } else {
//    config.headers['Authorization'] = 'Bearer ' + store.getters['auth/token']
//  }
//  return config
//}, function (error) {
//  return Promise.reject(error)
//})








// OLD WORKING WELL:

//apiCall.interceptors.request.use(
//  config => {
//    if (store.getters.access_token_exp) {
//      config.headers.Authorization = `JWT ${store.getters.get_jwt_access_token}`;
//    }
//    if (store.getters.refresh_token_exp) {
//      console.log('refresh_token_exp OK');
//    }
//    return config
//  },
//  error => {
//    Promise.reject(error)
//  }
//)