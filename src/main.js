import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from "./store"
import './assets/css/main.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
