import Vue from 'vue'
import App from './App.vue'
import Router from './route'
import Store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

Router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'TOP TRAVEL'
  next()
})

new Vue({
  router: Router,
  store: Store,
  render: h => h(App),
}).$mount('#app')
