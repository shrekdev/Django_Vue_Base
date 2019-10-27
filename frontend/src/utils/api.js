import axios from 'axios';
import store from '../store';
import router from '../router';
import {
  AUTH_TOKEN_REFRESH,
  AUTH_LOGOUT,
  REQUEST_PROCESSING_TRUE,
  REQUEST_PROCESSING_FALSE,
} from '@/store/actions/auth';


const apiCall = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    //    'X-CSRFToken': Cookies.get('csrftoken')
  },
});


function tokensExist() {
  return localStorage.getItem('access') === store.getters.getAccessToken
         && localStorage.getItem('refresh') === store.getters.getRefreshToken;
}


async function refreshToken() {
  const data = {
    refresh: store.getters.getRefreshToken,
  };
  try {
    const response = await axios.post('/api/auth/jwt/refresh/', data);
    localStorage.setItem('access', response.data.access);
    store.commit(AUTH_TOKEN_REFRESH, response);
    return response.data.access;
  } catch (err) {
    return Promise.reject(err);
  }
}


async function verifyToken(token) {
  const data = {
    token,
  };
  try {
    const response = await axios.post('/api/auth/jwt/verify/', data);
    return response.status;
  } catch (err) {

  }
}


apiCall.interceptors.request.use(async (config) => {
  store.commit(REQUEST_PROCESSING_TRUE);
  if (!tokensExist()) {
    return config;
  }
  if (await verifyToken(store.getters.getAccessToken) === 200) {
    config.headers.Authorization = `JWT ${store.getters.getAccessToken}`;
    return config;
  }
  if (await verifyToken(store.getters.getRefreshToken) === 200) {
    config.headers.Authorization = `JWT ${await refreshToken()}`;
  } else {
    store.dispatch(AUTH_LOGOUT);
    router.push('/');
  }


  return config;
}, (error) => {
  store.commit(REQUEST_PROCESSING_FALSE);
  return Promise.reject(error);
});


apiCall.interceptors.response.use((config) => {
  store.commit(REQUEST_PROCESSING_FALSE);
  return config;
}, (error) => {
  if (error.request !== undefined) {
    if (error.request.responseURL.includes('/jwt/create/')) {
      return Promise.reject(error);
    }
  }
  if (error.request !== undefined && (error.request.responseURL.includes('refresh')
      || error.request.status === 401 && error.config.__isRetryRequest)) {
    store.dispatch(AUTH_LOGOUT);
    router.push({ name: 'News' });
  } else if (error.request !== undefined && error.request.status === 401) {
    error.config.__isRetryRequest = true;
    return apiCall.request(error.config);
  }
  store.commit(REQUEST_PROCESSING_FALSE);
  return Promise.reject(error);
});


export default apiCall;
