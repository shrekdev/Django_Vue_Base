import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth.js';
//import { USER_REQUEST } from '../actions/user'
import apiCall from '../../utils/api';


const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  errors: {},
  hasLoadedOnce: false,
  badLogin: false,
}

const getters = {
  getToken: state => state.token,
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  badLogin: state => state.badLogin,
  authErrors: state => state.errors,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiCall.post('/api/auth/token/login/', user)
      .then(resp => {
        localStorage.setItem('user-token', resp.data.auth_token)
        commit(AUTH_SUCCESS, resp)
        resolve(resp)
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
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.data.auth_token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state, err) => {
    state.status = 'error';
    state.badLogin = true;
    state.hasLoadedOnce = true;
    state.errors = err.response.data
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
