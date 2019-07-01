import {
  TASKS_LOAD_TASK_LIST,
  TASKS_LOAD_TASK_LIST_SUCCESS,
  TASKS_LOAD_CATEGORY_LIST,
  TASKS_LOAD_CATEGORY_LIST_SUCCESS,
  TASKS_LOAD_STATUS_LIST,
  TASKS_LOAD_STATUS_LIST_SUCCESS,
//  TASKS_ADD_TASK,
  TASKS_UPDATE_TASK,
  TASKS_UPDATE_TASK_SUCCESS,
  TASKS_CHANGE_UPDATE_TASK_STATE,
  COMPLETE_SINGLE_TASK,
  COMPLETE_SINGLE_TASK_SUCCESS,
  DELETE_SINGLE_TASK,
  DELETE_SINGLE_TASK_SUCCESS,
} from '../actions/tasks.js';

import apiCall from '../../utils/api';
import Vue from 'vue';


function helper_CleanUpdateTaskStates() {
//  state.tasksSelected = [];
  state.taskToUpdate = {
    id: -1,
    title: '',
    category: [],
    status: [],
    priority: '',
  }
}


const state = {
  tasksList: {},
  tasksCategoryList: {},
  tasksStatusList: {},
//  tasksAddTask: false,
  // just to supply initial data to UpdateTask component
  taskToUpdate: {
    id: -1,
    title: '',
    category: [],
    status: '',
    priority: '',
  },
}


const getters = {
  getTasksList: state => state.tasksList,
  getTasksCategoryList: state => state.tasksCategoryList,
  getTasksStatusList: state => state.tasksStatusList,
  getTaskToUpdate: state => state.taskToUpdate,
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
        commit(TASKS_LOAD_CATEGORY_LIST_SUCCESS, resp);
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
        commit(TASKS_LOAD_STATUS_LIST_SUCCESS, resp);
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [TASKS_UPDATE_TASK]: ({commit, dispatch}, data) => {
    console.log('data: ', data.status)
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

  [COMPLETE_SINGLE_TASK]: ({commit, dispatch}, taskId) => {
    return new Promise((resolve, reject) => {
      apiCall.patch(`/api/tasks/update/${taskId}/`, {status: 2, completed: true})
      .then(resp => {
        dispatch(TASKS_LOAD_TASK_LIST);
        commit(COMPLETE_SINGLE_TASK_SUCCESS, taskId);
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
  [TASKS_LOAD_CATEGORY_LIST_SUCCESS]: (state, resp) => {
    state.tasksCategoryList = resp.data;
  },
  [TASKS_LOAD_STATUS_LIST_SUCCESS]: (state, resp) => {
    state.tasksStatusList = resp.data;
  },
  [TASKS_CHANGE_UPDATE_TASK_STATE]: (state, taskToUpdate) => {
    state.taskToUpdate = taskToUpdate;
    console.log('tasks updated')
  },
  [TASKS_UPDATE_TASK_SUCCESS]: (state, payload) => {
    const index = state.tasksList.findIndex(block => block.id === payload.id);
    console.log('new status: ', state.tasksList[index].status)
    state.taskToUpdate = state.tasksList[index];

//    const index = state.tasksList.findIndex(block => block.id === payload.id)
//    Vue.set(state.tasksList[index], 'title', payload.title)
//    Vue.set(state.tasksList[index], 'status', payload.status)
//    Vue.set(state.tasksList[index], 'category', payload.category)
//    Vue.set(state.tasksList[index], 'priority', payload.priority)
  },
  [DELETE_SINGLE_TASK_SUCCESS]: (state, taskId) => {
    const index = state.tasksList.findIndex(block => block.id === taskId);
    state.tasksList.splice(index, 1);
    helper_CleanUpdateTaskStates();
  },
  [COMPLETE_SINGLE_TASK_SUCCESS]: (state, taskId) => {
//  helper_CleanUpdateTaskStates();
//    const index = state.tasksList.findIndex(block => block.id === taskId);
//    console.log('old status: ', state.taskToUpdate.status)
//    console.log('new status: ', state.tasksList[index].status)
//    state.taskToUpdate = state.tasksList[index];

//    console.log('updated: ', state.tasksList[index].updated)
////    let updated_datetime = new Date(state.tasksList[index].updated)
//    let seconds = Math.floor(new Date(state.tasksList[index].updated).getTime() / 1000);
//    console.log('seconds = ', `id_${seconds}`)

//    Vue.set(state.tasksList[index], 'completed', true);
//    Vue.set(state.tasksList[index], 'priority', '1');
  },
}


export default {
  state,
  getters,
  actions,
  mutations,
}
