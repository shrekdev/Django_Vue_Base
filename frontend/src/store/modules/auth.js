import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT, TEST_ACTION, AUTH_TOKEN_REFRESH } from '../actions/auth.js';
//import { USER_REQUEST } from '../actions/user'
import apiCall from '../../utils/api';
import jwt_decode from 'jwt-decode';


const state = {
  jwt_access: localStorage.getItem('access') || '',
  jwt_refresh: localStorage.getItem('refresh') || '',
  status: '',
  errors: {},
//  hasLoadedOnce: false,
//  badLogin: false,
}

const getters = {
  get_jwt_access_token: state => state.jwt_access,
  get_jwt_refresh_token: state => state.jwt_refresh,
  isAuthenticated: state => !!state.jwt_access,
  authStatus: state => state.status,
//  badLogin: state => state.badLogin,
  authErrors: state => state.errors,

  is_authenticated: state => {
  },

  access_token_exp: state => {
    let token = jwt_decode(state.jwt_access);
    return (new Date().valueOf() / 1000) < token.exp    // or .getTime()
  },
  refresh_token_exp: state => {
    let token = jwt_decode(state.jwt_refresh);
    return (new Date().valueOf() / 1000) < token.exp    // or .getTime()
  }
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiCall.post('/api/auth/jwt/create/', user)
      .then(resp => {
        console.log(resp.data);
        localStorage.setItem('access', resp.data.access);
        localStorage.setItem('refresh', resp.data.refresh);
        commit(AUTH_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        console.log('error during logging, err: ', err.response.data)
        commit(AUTH_ERROR, err)
        localStorage.removeItem('user-token')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      resolve()
    })
  },

  [TEST_ACTION]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
//      commit(TEST_ACTION)
      console.log('IN TEST_ACTION');
      apiCall.post('/api/auth/jwt/create/');
      resolve()
    })
  },


  [AUTH_TOKEN_REFRESH]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
//      commit(TEST_ACTION)
      console.log('IN AUTH_TOKEN_REFRESH');
//      apiCall.post('/api/auth/jwt/create/');
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.jwt_access = resp.data.access
    state.jwt_refresh = resp.data.refresh
//    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state, err) => {
    state.status = 'error';
//    state.badLogin = true;
//    state.hasLoadedOnce = true;
    state.errors = err.response.data
  },
  [AUTH_LOGOUT]: (state) => {
    state.jwt_access = ''
    state.jwt_refresh = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
