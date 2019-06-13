import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/game',
      component:Index,
      children:[
        {
          path : 'game',
          name : 'scheme',
          component: () => import(/* webpackChunkName: "scheme" */ './views/scheme/scheme.vue')
        },
        {
          path : 'count',
          name : 'count',
          component: () => import(/* webpackChunkName: "count" */ './views/count/count.vue')
        },
        {
          path : 'team',
          name : 'team',
          component: () => import(/* webpackChunkName: "team" */ './views/team/team.vue')
        },
        {
          path : 'player',
          name : 'player',
          component: () => import(/* webpackChunkName: "player" */ './views/player/player.vue')
        },
        {
          path : 'user',
          name : 'user',
          component: () => import(/* webpackChunkName: "user" */ './views/user/user.vue')
        }
      ]
    },
    {
      path: '/team/detail',
      name: 'teamInfor',
      component: () => import(/* webpackChunkName: "team" */ './views/team/teamInfor.vue')
    }
  ]
})
