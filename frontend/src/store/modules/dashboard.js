import {
  DASHBOARD_STATS_STATUSES_LOAD
} from '../actions/dashboard.js';
import apiCall from '../../utils/api';
import Vue from 'vue';


const state = {

}


const getters = {

}


const actions = {
  [DASHBOARD_STATS_STATUSES_LOAD]: ({commit, dispatch}, userId) => {
    return new Promise((resolve, reject) => {
      apiCall.get(`/api/tasks/stats/statuses/${userId}`)
      .then(resp => {
//        console.log('resp data = ', resp.data);
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
