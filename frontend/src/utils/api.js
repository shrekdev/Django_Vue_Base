import axios from 'axios';
import store from '../store';

const apiCall = axios.create()

//const apiCall = axios.create({
//  timeout: 5000,
//  headers: {
//    'Content-Type': 'application/json',
//    'X-CSRFToken': Cookies.get('csrftoken')
//  }
//})

apiCall.interceptors.request.use(
  config => {
    if (store.getters.isAuthenticated) {
      config.headers.Authorization = `Token ${store.getters.getToken}`;
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default apiCall;
