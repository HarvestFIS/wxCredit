import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const applyCredit = r => require.ensure([], () => r(require('../page/applyCredit/applyCredit')), 'applyCredit')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        index: 1 // 页面索引值
      },
      component: home
    },
    {
      path: '/applyCredit',
      name: 'applyCredit',
      meta: {
        index: 2
      },
      component: applyCredit
    }
  ]
})
