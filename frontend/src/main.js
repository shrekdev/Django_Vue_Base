import Vue from 'vue'
import App from '@/app.vue'
import store from '@/store'
import router from '@/router'
import SignIn from './components/auth/SignIn.vue'
import SignUp from './components/auth/SignUp.vue'


Vue.component('sign-in', SignIn)
Vue.component('sign-up', SignUp)


const vue = new Vue({
  router,
  store,
  render: h => h(App),
  components: {
    SignIn,
    SignUp
  }
}).$mount('#app')
