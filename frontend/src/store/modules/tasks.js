import {
  TASKS_LOAD_TASK_LIST,
  TASKS_LOAD_TASK_LIST_SUCCESS,
  TASKS_LOAD_TASK_LIST_ERROR,
  TASKS_LOAD_CATEGORY_LIST,
  TASKS_LOAD_CATEGORY_LIST_SUCCESS,
  TASKS_LOAD_CATEGORY_LIST_ERROR,
  TASKS_ADD_TASK,
} from '../actions/tasks.js';
import apiCall from '../../utils/api';


const state = {
  tasksList: {},
  tasksCategoryList: {},
  tasksAddTask: false,
}


const getters = {
  getTasksList: state => state.tasksList,
  getTasksCategoryList: state => state.tasksCategoryList,
  getTasksAddTaskStatus: state => state.tasksAddTask,
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
  },
  [TASKS_LOAD_TASK_LIST_ERROR]: (state, err) => {
    state.tasksList = err;
  },
  [TASKS_LOAD_CATEGORY_LIST_SUCCESS]: (state, resp) => {
    state.tasksCategoryList = resp.data;
  },
  [TASKS_LOAD_CATEGORY_LIST_ERROR]: (state, err) => {
    state.tasksCategoryListError = err;
  },
  [TASKS_ADD_TASK]: (state) => {
    state.tasksAddTask = !state.tasksAddTask;
  },
}


export default {
  state,
  getters,
  actions,
  mutations,
}
