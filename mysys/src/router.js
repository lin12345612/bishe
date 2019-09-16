import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      // redirect:'/login',
      redirect:'/count',
      component: Index,
      children:[
        {
          path : 'count',
          name:'count',
          component: () => import(/* webpackChunkName: "count" */ './views/count.vue')
        },
        {
          path : 'player',
          name:'player',
          component: () => import(/* webpackChunkName: "player" */ './views/player.vue')
        },
        {
          path : 'team',
          name :'team',
          component: () => import(/* webpackChunkName: "team" */ './views/team.vue')
        },
        {
          path:'news',
          name : 'news',
          component: () => import(/* webpackChunkName: "news" */ './views/news.vue')
        },
        {
          path:'scheme',
          name : 'scheme',
          component: () => import(/* webpackChunkName: "scheme" */ './views/scheme.vue')
        },
        {
          path:'message',
          name : 'message',
          component: () => import(/* webpackChunkName: "message" */ './views/message.vue')
        },
        {
          path:'user',
          name : 'user',
          component: () => import(/* webpackChunkName: "user" */ './views/user.vue')
        },
        {
          path:'hotplayer',
          name : 'hotplayer',
          component: () => import(/* webpackChunkName: "hotplayer" */ './views/hotplayer.vue')
        }
      ]
    },
    {
      path : '/login',
      name : 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    }
  ]
})
