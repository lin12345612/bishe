import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Menu from '../components/define_menu/menu'
import One from '../components/route_test/one1'
import Two from '../components/route_test/two2'
import Three from '../components/route_test/three3'
import Main1 from '../components/route_test/main1'
import CheckBox from '../components/double_checkbox/ck1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CheckBox',
      component: CheckBox
    },
    {
      path: '/one',
      name : 'One',
      component : One
    },
    {
      path : '/more',
      name : 'more',
      component : Three
    },
    {
      path : '/two',
      name : 'two',
      component : Two
    }
  ]
})
