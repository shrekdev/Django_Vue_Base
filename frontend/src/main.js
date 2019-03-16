import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import App from '@/app.vue'


const vue = new Vue({
  router,
  store,
  render: h => h(App),
  components: {
  }
}).$mount('#app')
