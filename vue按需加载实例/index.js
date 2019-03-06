import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Menu from '../components/define_menu/menu'
// import One from '../components/route_test/one1'
// import Two from '../components/route_test/two2'
// import Three from '../components/route_test/three3'
// import Main1 from '../components/route_test/main1'
// import CheckBox from '../components/double_checkbox/ck1'
// import Echart from '../components/echarts/echart1'
// import Echart1 from '../components/echarts/echart_bar'
// import Echart2 from '../components/echarts/echart_line'
import Entering from '../components/entering/enter1'

Vue.use(Router)

export default new Router({
  linkActiveClass:'lin',
  routes: [
    {
      path : '/',
      name : 'Enter1',
      component:Entering
    },
    {
      path : '/one',
      name : 'Echarts2',
      component:resolve =>require.ensure([],()=>resolve(require('../components/echarts/echart_line.vue')),'echart2')
    },
    {
      path : '/two',
      name : 'Echarts1',
      component:resolve =>require.ensure([],() =>resolve(require('../components/echarts/echart_bar.vue')),'echart1')
    },
    {
      path : '/three',
      name : 'Menu',
      component:resolve => require.ensure([],() =>resolve(require('../components/define_menu/menu.vue')),'Menu')
    }
    // {
    //   path: '/',
    //   name: 'Menu',
    //   component: Menu
    // },
    // {
    //   path : '/',
    //   name : 'Echarts',
    //   component:Echart
    // }
    // {
    //   path: '/one/:id',
    //   name : 'One',
    //   component : One
    // },
    // {
    //   path : '/more/:id',
    //   name : 'more',
    //   component : Three
    // },
    // {
    //   path : '/two',
    //   name : 'two',
    //   component : Two
    // }
  ]
})
