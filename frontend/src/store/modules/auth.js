import {
    AUTH_SIGN_UP,
    AUTH_SIGN_UP_ERROR,
    AUTH_LOG_IN,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    TEST_ACTION,
    AUTH_TOKEN_REFRESH
} from '../actions/auth.js';
import apiCall from '../../utils/api';
import jwt_decode from 'jwt-decode';


const state = {
  accessToken: localStorage.getItem('access'),
  refreshToken: localStorage.getItem('refresh'),
  status: '',
  errors: {},
  signup_errors: {},
}


const getters = {
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  isAuthenticated: state => !!state.accessToken && !!state.refreshToken,
  authStatus: state => state.status,
  authErrors: state => state.errors,
  signUpErrors: state => state.signup_errors,
}


const actions = {

  [AUTH_SIGN_UP]: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
//      commit(AUTH_SIGN_UP)
        console.log('data -> ', data);
      apiCall.post('http://127.0.0.1:8000/api/auth/users/', data)
      .then(resp => {
        console.log("AUTH_SIGN_UP: resp: ", resp);
//        commit(AUTH_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        console.log("AUTH_SIGN_UP: error: ", err);
        commit(AUTH_SIGN_UP_ERROR, err);
        reject(err);
      })
    })
  },

  [AUTH_LOG_IN]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOG_IN)
      apiCall.post('/api/auth/jwt/create/', user)
      .then(resp => {
        localStorage.setItem('access', resp.data.access);
        localStorage.setItem('refresh', resp.data.refresh);
        commit(AUTH_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        commit(AUTH_ERROR, err);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        reject(err);
      })
    })
  },

  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      resolve();
    })
  },

  [TEST_ACTION]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      console.log('IN TEST_ACTION');
      apiCall.get('/api/auth/me/');    // przykładowo, aby sprawdzić weryfikację jwt
      resolve();
    })
  },

}

const mutations = {

  [AUTH_SIGN_UP_ERROR]: (state, err) => {
    state.signup_errors = err.response.data
  },

  [AUTH_LOG_IN]: (state) => {
    state.status = 'loading'
  },

  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.accessToken = resp.data.access
    state.refreshToken = resp.data.refresh
  },

  [AUTH_ERROR]: (state, err) => {
    state.errors = err.response.data
  },

  [AUTH_LOGOUT]: (state) => {
    state.accessToken = ''
    state.refreshToken = ''
  },

  [AUTH_TOKEN_REFRESH]: (state, resp) => {
    state.accessToken = resp.data.access
  }

}


export default {
  state,
  getters,
  actions,
  mutations,
}
