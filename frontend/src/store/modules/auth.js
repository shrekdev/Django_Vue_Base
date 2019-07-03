import {
    AUTH_SIGN_UP,
    AUTH_SIGN_UP_SUCCESS,
    AUTH_SIGN_UP_ERROR,
    AUTH_ACCOUNT_ACTIVATE,
    AUTH_ACCOUNT_ACTIVATE_SUCCESS,
    AUTH_ACCOUNT_ACTIVATE_ERROR,
    AUTH_LOG_IN,
    AUTH_LOG_IN_ERROR,
    AUTH_LOG_IN_SUCCESS,
    AUTH_LOGOUT,
    TEST_ACTION,
    AUTH_TOKEN_REFRESH,
    AUTH_PASSWORD_RESET,
    AUTH_PASSWORD_RESET_SUCCESS,
    AUTH_PASSWORD_RESET_ERROR,
    AUTH_PASSWORD_RESET_CONFIRM,
    AUTH_PASSWORD_RESET_CONFIRM_SUCCESS,
    AUTH_PASSWORD_RESET_CONFIRM_ERROR,
    REQUEST_PROCESSING_TRUE,
    REQUEST_PROCESSING_FALSE,
} from '../actions/auth.js';
import apiCall from '../../utils/api';
import jwt_decode from 'jwt-decode';


const state = {
  requestProcessing: false,
  accessToken: localStorage.getItem('access'),
  refreshToken: localStorage.getItem('refresh'),
  accountSignUpStatus: "",
  accountActivationStatus: "",
  accountPasswordResetStatus: "",
  accountPasswordResetErrors: "",
  accountPasswordResetConfirmStatus: "",
  accountPasswordResetConfirmErrors: {},
  status: '',
  logInErrors: {},
  signup_errors: {},
}


const getters = {
  getRequestProcessing: state => state.requestProcessing,
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  isAuthenticated: state => !!state.accessToken && !!state.refreshToken,
  getLogInStatus: state => state.logInStatus,
  getLogInErrors: state => state.logInErrors,
  signUpErrors: state => state.signup_errors,
  getAccountSignUpStatus: state => state.accountSignUpStatus,
  getAccountActivationStatus: state => state.accountActivationStatus,
  getAccountPasswordResetStatus: state => state.accountPasswordResetStatus,
  getAccountPasswordResetErrors: state => state.accountPasswordResetErrors,
  getAccountPasswordResetConfirmStatus: state => state.accountPasswordResetConfirmStatus,
  getAccountPasswordResetConfirmErrors: state => state.accountPasswordResetConfirmErrors,
  getUserId() {
    return jwt_decode(state.accessToken).user_id;
  }
}


const actions = {

  [AUTH_SIGN_UP]: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      apiCall.post('/api/auth/users/', data)
      .then(resp => {
        commit(AUTH_SIGN_UP_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        commit(AUTH_SIGN_UP_ERROR, err);
        reject(err);
      })
    })
  },

  [AUTH_ACCOUNT_ACTIVATE]: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      apiCall.post('/api/auth/users/confirm/', data)
      .then(resp => {
        commit(AUTH_ACCOUNT_ACTIVATE_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        commit(AUTH_ACCOUNT_ACTIVATE_ERROR, err);
        reject(err);
      })
    })
  },

  [AUTH_LOG_IN]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      apiCall.post('/api/auth/jwt/create/', user)
      .then(resp => {
        localStorage.setItem('access', resp.data.access);
        localStorage.setItem('refresh', resp.data.refresh);
        commit(AUTH_LOG_IN_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        commit(AUTH_LOG_IN_ERROR, err);
        reject(err);
      })
    })
  },

  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      commit(AUTH_LOGOUT);
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

  [AUTH_PASSWORD_RESET]: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      apiCall.post('/api/auth/password/reset/', data)
      .then(resp => {
        commit(AUTH_PASSWORD_RESET_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        commit(AUTH_PASSWORD_RESET_ERROR, err);
        reject(err);
      })
    })
  },

  [AUTH_PASSWORD_RESET_CONFIRM]: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      apiCall.post('/api/auth/password/reset/confirm/', data)
      .then(resp => {
        console.log('hasło zmienione')
        commit(AUTH_PASSWORD_RESET_CONFIRM_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        console.log('error in AUTH_PASSWORD_RESET_CONFIRM_ERROR')
        commit(AUTH_PASSWORD_RESET_CONFIRM_ERROR, err);
        reject(err);
      })
    })
  },
}

const mutations = {

  [AUTH_SIGN_UP_SUCCESS]: (state, resp) => {
    state.accountSignUpStatus = 'success';
    state.signup_errors = {};
  },
  [AUTH_SIGN_UP_ERROR]: (state, err) => {
    state.accountSignUpStatus = 'error';
    state.signup_errors = err.response.data;
  },


  [AUTH_ACCOUNT_ACTIVATE_SUCCESS]: (state, resp) => {
    state.accountActivationStatus = 'success';
  },
  [AUTH_ACCOUNT_ACTIVATE_ERROR]: (state, err) => {
    state.accountActivationStatus = 'error';
  },


  [AUTH_LOG_IN_SUCCESS]: (state, resp) => {
    state.logInStatus = 'success';
    state.logInErrors = '';
    state.accessToken = resp.data.access;
    state.refreshToken = resp.data.refresh;
  },
  [AUTH_LOG_IN_ERROR]: (state, err) => {
    state.logInErrors = err.response.data;
    state.logInStatus = 'error';
  },


  [AUTH_LOGOUT]: (state) => {
    state.accessToken = '';
    state.refreshToken = '';
  },

  [AUTH_TOKEN_REFRESH]: (state, resp) => {
    state.accessToken = resp.data.access;
  },

  [AUTH_PASSWORD_RESET_SUCCESS]: (state, resp) => {
    state.accountPasswordResetStatus = 'success';
    state.accountPasswordResetErrors = {};
  },
  [AUTH_PASSWORD_RESET_ERROR]: (state, err) => {
    state.accountPasswordResetStatus = 'error';
    state.accountPasswordResetErrors = err.response.data;
  },

  [AUTH_PASSWORD_RESET_CONFIRM_SUCCESS]: (state, resp) => {
    state.accountPasswordResetConfirmErrors = {}
    state.accountPasswordResetConfirmStatus = 'success';
  },
  [AUTH_PASSWORD_RESET_CONFIRM_ERROR]: (state, err) => {
    state.accountPasswordResetConfirmErrors = err.response.data;
    state.accountPasswordResetConfirmStatus = 'error';
  },


  [REQUEST_PROCESSING_TRUE]: (state) => {
    state.requestProcessing = true;
  },
  [REQUEST_PROCESSING_FALSE]: (state) => {
    state.requestProcessing = false;
  },
}


export default {
  state,
  getters,
  actions,
  mutations,
}
