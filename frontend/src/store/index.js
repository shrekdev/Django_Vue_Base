import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import tasks from './modules/tasks'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    tasks,
  },
})
