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
    },
    {
      path:'/mobile/outlink',
      name:'outLink',
      component:()=>import(/*webpackChunkName:"outlink"*/'./components/out-link.vue' )
    },
    {
      path:'/player/detail',
      name : 'playerInfor',
      component:()=>import(/*webpackChunkName :"player" */ './views/player/player-info.vue')
    },
    {
      path:'/user/register',
      name : 'register',
      component:()=>import(/*webpackChunkName :"user" */ './views/user/register.vue')
    },
    {
      path:'/user/resetpsw',
      name : 'resetpsw',
      component:()=>import(/*webpackChunkName :"user" */ './views/user/resetpsw.vue')
    },
    {
      path:'/user/personal',
      name :'personal',
      component:()=>import(/*webpackChunkName: 'user' */ './views/user/personalInfor.vue')
    },
    {
      path:'/user/modifyTx',
      name :'modifyTx',
      component:()=>import(/*webpackChunkName: 'user' */ './views/user/modifyTx.vue')
    },
    {
      path:'/user/modifyNc',
      name :'modifyNc',
      component:()=>import(/*webpackChunkName: 'user' */ './views/user/modifyNc.vue')
    },
    {
      path:'/user/modifyPsw',
      name :'modifyPsw',
      component:()=>import(/*webpackChunkName: 'user' */ './views/user/modifyPsw.vue')
    },
    {
      path:'/user/aboutus',
      name :'aboutus',
      component:()=>import(/*webpackChunkName: 'user' */ './views/user/about-us.vue')
    },
    {
      path:'/user/more',
      name :'more',
      component:()=>import(/*webpackChunkName: 'user' */ './views/user/more.vue')
    },
    {
      path:'/user/myplayer',
      name :'myplayer',
      component:()=>import(/*webpackChunkName: 'user' */ './views/user/myplayer.vue')
    },
    {
      path:'/user/myteam',
      name :'myteam',
      component:()=>import(/*webpackChunkName: 'user' */ './views/user/myteam.vue')
    },
    {
      path :'/*',
      redirect:'/game'
    }
  ]
})
