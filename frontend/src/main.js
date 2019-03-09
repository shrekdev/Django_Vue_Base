import Vue from 'vue'
import App from '@/app.vue'


const vue = new Vue({
  render: h => h(App)
})

vue.$mount('#app')
