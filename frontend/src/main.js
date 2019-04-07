import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import App from '@/app.vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)


import PasswordReset from './components/auth/PasswordReset.vue';
Vue.component('PasswordReset', PasswordReset)


const vue = new Vue({
  router,
  store,
  render: h => h(App),
  components: {
  }
}).$mount('#app')


