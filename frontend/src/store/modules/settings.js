import Vue from 'vue';
import {
  SETTINGS_GET_TASK_STATUS_LIST,
  SETTINGS_UPDATE_STATUS,
  SETTINGS_CREATE_STATUS,
} from '../actions/settings.js';
import { TASKS_LOAD_STATUS_LIST } from '../actions/tasks.js';

import apiCall from '../../utils/api';


const state = {
};


const getters = {
};


const actions = {
//  [SETTINGS_GET_TASK_STATUS_LIST]: ({commit, dispatch}, userId) => {
//    return new Promise((resolve, reject) => {
//      apiCall.get('/api/tasks/status/list/')
//      .then(resp => {
//        resolve(resp);
//      })
//      .catch(err => {
//        reject(err);
//      })
//    })
//  },

  [SETTINGS_UPDATE_STATUS]: ({ commit, dispatch }, payload) => new Promise((resolve, reject) => {
    const id = payload.id;
    delete payload.id;
    apiCall.patch(`/api/tasks/status/update/${id}/`, payload)
      .then((resp) => {
        dispatch(TASKS_LOAD_STATUS_LIST);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  }),


  [SETTINGS_CREATE_STATUS]: ({ commit, dispatch }, payload) => new Promise((resolve, reject) => {
    apiCall.post('/api/tasks/status/create/', payload)
      .then((resp) => {
        console.log('response: ', resp);
        dispatch(TASKS_LOAD_STATUS_LIST);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  }),

};


const mutations = {
};


export default {
  state,
  getters,
  actions,
  mutations,
};
