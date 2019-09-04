import {
  DASHBOARD_STATS_NEW_AND_OLD_LOAD,
  DASHBOARD_STATS_EISENHOWER_MATRIX_LOAD,
  DASHBOARD_STATS_STATUS_LIST_LOAD,
  DASHBOARD_STATS_STATUSES_CHART,
} from '../actions/dashboard.js';
import apiCall from '../../utils/api';
import Vue from 'vue';


const state = {

}


const getters = {

}


const actions = {
  [DASHBOARD_STATS_NEW_AND_OLD_LOAD]: ({commit, dispatch}, userId) => {
    return new Promise((resolve, reject) => {
      apiCall.get(`/api/tasks/stats/new-and-old/`)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [DASHBOARD_STATS_EISENHOWER_MATRIX_LOAD]: ({commit, dispatch}, userId) => {
    return new Promise((resolve, reject) => {
      apiCall.get(`/api/tasks/stats/eisenhower-matrix/`)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [DASHBOARD_STATS_STATUS_LIST_LOAD]: ({commit, dispatch}, userId) => {
    return new Promise((resolve, reject) => {
      apiCall.get(`/api/tasks/stats/statuses/`)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [DASHBOARD_STATS_STATUSES_CHART]: ({commit, dispatch}, userId) => {
    return new Promise((resolve, reject) => {
      apiCall.get('/api/tasks/stats/statuses/chart/')
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
