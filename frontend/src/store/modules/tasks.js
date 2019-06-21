import {
  TASKS_LOAD_TASK_LIST,
  TASKS_LOAD_TASK_LIST_SUCCESS,
  TASKS_LOAD_TASK_LIST_ERROR,
  TASKS_LOAD_CATEGORY_LIST,
  TASKS_LOAD_CATEGORY_LIST_SUCCESS,
  TASKS_LOAD_CATEGORY_LIST_ERROR,
  TASKS_ADD_TASK,
  TASKS_UPDATE_TASK,
  TASKS_UPDATE_TASK_STATUS,
} from '../actions/tasks.js';
import apiCall from '../../utils/api';


const state = {
  tasksList: {},
  tasksCategoryList: {},
  tasksAddTask: false,
  tasksUpdateTaskStatus: false,
  taskToUpdate: {},
}


const getters = {
  getTasksList: state => state.tasksList,
  getTasksCategoryList: state => state.tasksCategoryList,
  getTasksAddTaskStatus: state => state.tasksAddTask,
  getTasksUpdateTaskStatus: state => state.tasksUpdateTaskStatus,
  getTaskToUpdate: state => state.taskToUpdate,
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
  [TASKS_UPDATE_TASK_STATUS]: (state, taskToUpdate) => {
    state.tasksUpdateTaskStatus = !state.tasksUpdateTaskStatus;
    state.taskToUpdate = taskToUpdate;
//    const index = state.tasksList.findIndex(block => block.id === update.id)
//    console.log('index: ', index)
//    update.title = "new"
//    Vue.set(state.tasksList, index, update)
  },
  [TASKS_UPDATE_TASK]: (state, updated) => {
    console.log('TASKS_UPDATE_TASK | updated: ', updated)
  },
}


export default {
  state,
  getters,
  actions,
  mutations,
}
