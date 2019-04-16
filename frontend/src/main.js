import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import App from '@/app.vue';
import VueSweetalert2 from 'vue-sweetalert2';


Vue.use(VueSweetalert2);


const vue = new Vue({
  router,
  store,
  render: h => h(App),
  components: {
  }
}).$mount('#app')


