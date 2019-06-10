import {
  TASKS_LOAD_TASK_LIST,
  TASKS_LOAD_TASK_LIST_SUCCESS,
  TASKS_LOAD_TASK_LIST_ERROR,
} from '../actions/tasks.js';
import apiCall from '../../utils/api';


const state = {
  tasksList: {},
  tasksListError: {},
}


const getters = {
  getTasksList: state => state.tasksList,
  getTasksListError: state => state.tasksListError,
}


const actions = {
  [TASKS_LOAD_TASK_LIST]: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      apiCall.get('/api/tasks/task_list/', data)
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
}


export default {
  state,
  getters,
  actions,
  mutations,
}
