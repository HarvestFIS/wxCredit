import Vue from 'vue'
import Router from 'vue-router'
import  AssignTableList from '../page/Assign/AssignTableList'
import  Assigindetails from '../page/Assign/Assigindetails'
import  AssignOperation from '../page/Assign/AssignOperation'
import  AssetsTable from '../page/AssetsTable/AssetsTable'
import  MonthlyInterestTable from '../page/MonthlyInterestTable/MonthlyInterestTable'






Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const applyCredit = r => require.ensure([], () => r(require('../page/applyCredit/applyCredit')), 'applyCredit')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const applyUnfreeze = r => require.ensure([], () => r(require('../page/applyUnfreeze/applyUnfreeze')), 'applyUnfreeze')

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
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        index: 98
      },
      component: login
    },
      {
        path: '/applyUnfreeze',
        name: 'applyUnfreeze',
        meta: {
          index: 3
        },
        component: applyUnfreeze
      },
     {
        path: '/assigntablelist',
        name: 'AssignTableList',
        component: AssignTableList
      },
      {
        path: '/assigindetails',
        name: 'Assigindetails',
        component: Assigindetails
      },
      {
        path: '/assignoperation',
        name: 'AssignOperation',
        component: AssignOperation
      },

      {
        path: '/assetstable',
        name: 'AssetsTable',
        component: AssetsTable
      },
      {
        path: '/monthlyinterest',
        name: 'MonthlyInterestTable',
        component: MonthlyInterestTable 
      }

      
  ]
})
