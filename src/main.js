import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from "./store"
import './assets/css/main.css'
import storageCleanerMixin from './storageCleanerMixin'

// Vue.mixin(storageCleanerMixin)

//Vue.config.productionTip = false//关闭生产提示

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
