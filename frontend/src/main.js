import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import App from '@/app.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import moment from 'moment'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.use(VueSweetalert2);
Vue.use(Vuetify)


Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY HH:mm')
  }
})


const vue = new Vue({
  router,
  store,
  render: h => h(App),
  components: {
  }
}).$mount('#app')
