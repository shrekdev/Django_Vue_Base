import {
  TASKS_LOAD_TASK_LIST,
  TASKS_LOAD_TASK_LIST_SUCCESS,
  TASKS_LOAD_CATEGORY_LIST,
  TASKS_LOAD_STATUS_LIST,
  TASKS_UPDATE_TASK,
  SET_TASK_ID_TO_UPDATE,
  PATCH_TASK,
  DELETE_SINGLE_TASK,
  DELETE_SINGLE_TASK_SUCCESS,
  ADD_TASK,
  CLEAR_TASK_TO_UPDATE_STATE,
  CHANGE_SELECTED_TASK,
  SHOW_TASK_FORM,
} from '../actions/tasks.js';
import apiCall from '../../utils/api';
import Vue from 'vue';


// TODO: remove it
function helper_CleanUpdateTaskStates() {
  state.taskToUpdate = 0;
}

const state = {
  tasksList: {},
  taskToUpdate: 0,
  selectedTasks: [],
  showTaskForm: false,
}

const getters = {
  getTasksList: state => state.tasksList,
  getTaskIdToUpdate: state => state.taskToUpdate,
  getSelectedTasksIds: state => state.selectedTasks,
  getShowTakFormStatus: state => state.showTaskForm,

  getTaskById(state) {
    return id => state.tasksList.filter(item =>{
      return item.id === id
    });
  },
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
        commit(CLEAR_TASK_TO_UPDATE_STATE);
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

  [PATCH_TASK]: ({commit, dispatch}, payload) => {
    return new Promise((resolve, reject) => {
      const id = payload.id;
      delete payload.id;
      apiCall.patch(`/api/tasks/update/${id}/`, payload)
      .then(resp => {
        dispatch(TASKS_LOAD_TASK_LIST);
        commit(CLEAR_TASK_TO_UPDATE_STATE);
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [ADD_TASK]: ({commit, dispatch}, payload) => {
    return new Promise((resolve, reject) => {
      console.log('ADD_TASK: data = ', payload)
      apiCall.post('/api/tasks/create/', payload)
      .then(resp => {
        resolve(resp);
        dispatch(TASKS_LOAD_TASK_LIST);
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
    state.showTaskForm = true;
  },
  [DELETE_SINGLE_TASK_SUCCESS]: (state, taskId) => {
    const index = state.tasksList.findIndex(block => block.id === taskId);
    state.tasksList.splice(index, 1);
    helper_CleanUpdateTaskStates();
  },
  [CLEAR_TASK_TO_UPDATE_STATE]: (state) => {
    state.taskToUpdate = 0;
    state.showTaskForm = false;
  },
  [CHANGE_SELECTED_TASK]: (state, newArray) => {
    state.selectedTasks = newArray;
  },
  [SHOW_TASK_FORM]: (state) => {
    state.showTaskForm = !state.showTaskForm;
  },
}


export default {
  state,
  getters,
  actions,
  mutations,
}
