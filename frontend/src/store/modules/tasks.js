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
  SELECT_ALL_TASKS,
  MARK_SELECTED_TASKS_AS_COMPLETED,
  MARK_SELECTED_TASKS_WITH_STAR,
  DELETE_SELECTED_TASKS,
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
  selectedAllTasks: false,
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
  [TASKS_LOAD_TASK_LIST]: ({commit, dispatch}, data) => {
    state.tasksList = {}
    return new Promise((resolve, reject) => {
      apiCall.get('/api/tasks/task_list/', {params: data})
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

  [MARK_SELECTED_TASKS_AS_COMPLETED]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      const payload = {
        ids: state.selectedTasks
      }
      apiCall.post('/api/tasks/bulk/completed', payload)
      .then(resp => {
        dispatch(TASKS_LOAD_TASK_LIST);
        state.selectedTasks = [];
        state.selectedAllTasks = false;
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [MARK_SELECTED_TASKS_WITH_STAR]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      const payload = {
        ids: state.selectedTasks
      }
      apiCall.post('/api/tasks/bulk/star', payload)
      .then(resp => {
        dispatch(TASKS_LOAD_TASK_LIST);
        state.selectedTasks = [];
        state.selectedAllTasks = false;
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  [DELETE_SELECTED_TASKS]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      const payload = {
        ids: state.selectedTasks
      }
      apiCall.post('/api/tasks/bulk/delete', payload)
      .then(resp => {
        dispatch(TASKS_LOAD_TASK_LIST);
        state.selectedTasks = [];
        state.selectedAllTasks = false;
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
  [CHANGE_SELECTED_TASK]: (state, taskId) => {
    if (state.selectedTasks.includes(taskId)) {
      for(let i = 0; i < state.selectedTasks.length; i++){
        if (state.selectedTasks[i] === taskId) {
          state.selectedTasks.splice(i, 1);
          i--;
        }
      }
    } else {
      state.selectedTasks.push(taskId);
    }
  },
  [SELECT_ALL_TASKS]: (state) => {
    state.selectedAllTasks = !state.selectedAllTasks;
    if (state.selectedAllTasks) {
      for(let i=0; i<state.tasksList.length; i++) {
        if(!state.selectedTasks.includes(state.tasksList[i].id)) {
          state.selectedTasks.push(state.tasksList[i].id);
        }
      }
    } else {
      state.selectedTasks = [];
    }
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
