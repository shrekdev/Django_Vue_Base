import {
  SETTINGS_GET_TASK_STATUS_LIST,
} from '../actions/settings.js';
import apiCall from '../../utils/api';
import Vue from 'vue';


const state = {
}


const getters = {
}


const actions = {
  [SETTINGS_GET_TASK_STATUS_LIST]: ({commit, dispatch}, userId) => {
    return new Promise((resolve, reject) => {
      apiCall.get('/api/tasks/status/update/')
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
}


const mutations = {
}


export default {
  state,
  getters,
  actions,
  mutations,
}
