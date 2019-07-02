import {
  TASKS_LOAD_TASK_LIST,
  TASKS_LOAD_TASK_LIST_SUCCESS,
  TASKS_LOAD_CATEGORY_LIST,
  TASKS_LOAD_STATUS_LIST,
  TASKS_UPDATE_TASK,
  TASKS_UPDATE_TASK_SUCCESS,
  SET_TASK_ID_TO_UPDATE,
  COMPLETE_SINGLE_TASK,
  COMPLETE_SINGLE_TASK_SUCCESS,
  DELETE_SINGLE_TASK,
  DELETE_SINGLE_TASK_SUCCESS,
} from '../actions/tasks.js';

import apiCall from '../../utils/api';
import Vue from 'vue';


function helper_CleanUpdateTaskStates() {
  state.taskToUpdate = 0;
}

const state = {
  tasksList: {},
  taskToUpdate: 0,
}

const getters = {
  getTasksList: state => state.tasksList,
  getTaskIdToUpdate: state => state.taskToUpdate,
    getTaskById(state) {
      return id => state.tasksList.filter(item =>{
        return item.id === id
      });
    },
}


const actions = {
  [TASKS_LOAD_TASK_LIST]: ({commit, dispatch}) => {
    console.log('TASKS_LOAD_TASK_LIST')
    return new Promise((resolve, reject) => {
      apiCall.get('/api/tasks/task_list/')
      .then(resp => {
        commit(TASKS_LOAD_TASK_LIST_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [TASKS_LOAD_CATEGORY_LIST]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      apiCall.get('/api/tasks/category_list/')
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [TASKS_LOAD_STATUS_LIST]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      apiCall.get('/api/tasks/status/list/')
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [TASKS_UPDATE_TASK]: ({commit, dispatch}, data) => {
    console.log('data: ', data)
    return new Promise((resolve, reject) => {
      apiCall.put(`/api/tasks/update/${data.id}/`, data)
      .then(resp => {
        dispatch(TASKS_LOAD_TASK_LIST);
        commit(TASKS_UPDATE_TASK_SUCCESS, data);
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [DELETE_SINGLE_TASK]: ({commit, dispatch}, taskId) => {
    return new Promise((resolve, reject) => {
      apiCall.delete(`/api/tasks/delete/${taskId}/`)
      .then(resp => {
        commit(DELETE_SINGLE_TASK_SUCCESS, taskId);
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [COMPLETE_SINGLE_TASK]: ({commit, dispatch}, payload) => {
    return new Promise((resolve, reject) => {
      apiCall.patch(`/api/tasks/update/${payload.id}/`, {status: payload.status, completed: payload.completed})
      .then(resp => {
        dispatch(TASKS_LOAD_TASK_LIST);
        commit(COMPLETE_SINGLE_TASK_SUCCESS);
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
}


const mutations = {
  [TASKS_LOAD_TASK_LIST_SUCCESS]: (state, resp) => {
    state.tasksList = resp.data;
  },
  [SET_TASK_ID_TO_UPDATE]: (state, taskId) => {
    state.taskToUpdate = taskId;
  },
  [TASKS_UPDATE_TASK_SUCCESS]: (state, payload) => {
    state.taskToUpdate = 0;
  },
  [DELETE_SINGLE_TASK_SUCCESS]: (state, taskId) => {
    const index = state.tasksList.findIndex(block => block.id === taskId);
    state.tasksList.splice(index, 1);
    helper_CleanUpdateTaskStates();
  },
  [COMPLETE_SINGLE_TASK_SUCCESS]: (state) => {
    state.taskToUpdate = 0;
  },
}


export default {
  state,
  getters,
  actions,
  mutations,
}
