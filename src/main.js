// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'

import './assets/js/vueFilter.js'

Vue.config.productionTip = false

// Vue.use(MintUI)
Vue.use(Vant)
// Vue.use(vueFilter)

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
