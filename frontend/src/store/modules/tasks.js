import {
  TASKS_LOAD_TASK_LIST,
  TASKS_LOAD_TASK_LIST_SUCCESS,
  TASKS_LOAD_TASK_LIST_ERROR,
  TASKS_LOAD_CATEGORY_LIST,
  TASKS_LOAD_CATEGORY_LIST_SUCCESS,
  TASKS_LOAD_CATEGORY_LIST_ERROR,
} from '../actions/tasks.js';
import apiCall from '../../utils/api';


const state = {
  tasksList: {},
  tasksListError: {},
  tasksCategoryList: {},
  tasksCategoryListError: {},
}


const getters = {
  getTasksList: state => state.tasksList,
//  getTasksListError: state => state.tasksListError,
  getTasksCategoryList: state => state.tasksCategoryList,
//  getTasksCategoryListError: state => state.tasksCategoryListError,
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
        commit(TASKS_LOAD_TASK_LIST_ERROR, err);
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
        commit(TASKS_LOAD_CATEGORY_LIST_ERROR, err);
        reject(err);
      })
    })
  },
}


const mutations = {
  [TASKS_LOAD_TASK_LIST_SUCCESS]: (state, resp) => {
    state.tasksList = resp.data;
    console.log("TASKS_LOAD_TASK_LIST_SUCCESS: ", resp.data)
  },
  [TASKS_LOAD_TASK_LIST_ERROR]: (state, err) => {
    state.tasksList = err;
    console.log("TASKS_LOAD_TASK_LIST_ERROR: ", err)
  },

  [TASKS_LOAD_CATEGORY_LIST_SUCCESS]: (state, resp) => {
    state.tasksCategoryList = resp.data;
    console.log("TASKS_LOAD_CATEGORY_LIST_SUCCESS: ", resp.data)
  },
  [TASKS_LOAD_CATEGORY_LIST_ERROR]: (state, err) => {
    state.tasksCategoryListError = err;
    console.log("TASKS_LOAD_CATEGORY_LIST_ERROR: ", err)
  },
}


export default {
  state,
  getters,
  actions,
  mutations,
}
