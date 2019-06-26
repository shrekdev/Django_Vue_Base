import {
  TASKS_LOAD_TASK_LIST,
  TASKS_LOAD_TASK_LIST_SUCCESS,
  TASKS_LOAD_CATEGORY_LIST,
  TASKS_LOAD_CATEGORY_LIST_SUCCESS,
  TASKS_ADD_TASK,
  TASKS_UPDATE_TASK,
  TASKS_UPDATE_TASK_SUCCESS,
  TASKS_CHANGE_UPDATE_TASK_STATE,
  TASKS_SELECTED_UPDATE,
  TASKS_REMOVE_SELECTED,
  TASKS_MARK_COMPLETE_SELECTED,
} from '../actions/tasks.js';

import apiCall from '../../utils/api';
import Vue from 'vue';


const state = {
  tasksList: {},
  tasksCategoryList: {},
  tasksAddTask: false,
  // just to supply initial data to UpdateTask component
  taskToUpdate: {
    id: -1,
    title: '',
    category: [],
    status: '',
    priority: '',
  },
  tasksChecked: [],
}


const getters = {
  getTasksList: state => state.tasksList,
  getTasksCategoryList: state => state.tasksCategoryList,
  getTasksAddTaskStatus: state => state.tasksAddTask,
  getTaskToUpdate: state => state.taskToUpdate,
  getTasksSelected: state => state.tasksChecked,
}


const actions = {
  [TASKS_LOAD_TASK_LIST]: ({commit, dispatch}) => {
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

  [TASKS_UPDATE_TASK]: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      apiCall.put(`/api/tasks/update/${data.id}/`, data)
      .then(resp => {
        commit(TASKS_UPDATE_TASK_SUCCESS, data);
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
  [TASKS_ADD_TASK]: (state) => {
    state.tasksAddTask = !state.tasksAddTask;
  },
  [TASKS_CHANGE_UPDATE_TASK_STATE]: (state, taskToUpdate) => {
    state.taskToUpdate = taskToUpdate;
  },
  [TASKS_UPDATE_TASK_SUCCESS]: (state, payload) => {
    const index = state.tasksList.findIndex(block => block.id === payload.id)
    Vue.set(state.tasksList[index], 'title', payload.title)
    Vue.set(state.tasksList[index], 'status', payload.status)
    Vue.set(state.tasksList[index], 'category', payload.category)
    Vue.set(state.tasksList[index], 'priority', payload.priority)
  },
  [TASKS_SELECTED_UPDATE]: (state, updatedArray) => {
    state.tasksChecked = updatedArray;
  },
  [TASKS_REMOVE_SELECTED]: (state, toRemove) => {
    for (let i = toRemove.length - 1; i >= 0; i--) {
      let r = toRemove[i];
      const index = state.tasksList.findIndex(block => block.id === r);
      state.tasksList.splice(index, 1);
    }
  },
  [TASKS_MARK_COMPLETE_SELECTED]: (state, toComplete) => {
    for (let i = toComplete.length - 1; i >= 0; i--) {
      let r = toComplete[i];
      const index = state.tasksList.findIndex(block => block.id === r);
      Vue.set(state.tasksList[index], 'id', index);
      Vue.set(state.tasksList[index], 'completed', true);
      Vue.set(state.tasksList[index], 'status', '5');
    }
  }
}


export default {
  state,
  getters,
  actions,
  mutations,
}
