import Vue from "vue";
import Router from "vue-router";
import Range from "./views/trange/range.vue";
 
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path : '/',
      redirect:'/pc'
    },
    {
      path: "/pc",
      name: "range",
      component: Range
    },
    {
      path: "/pc/teamInfor",
      name: "teamInfor",
      component: () =>
        import(/* webpackChunkName: "teamInfor" */ "@/views/teamInfor/tinfor.vue")
        // import("@/views/teamInfor/tinfor.vue")
    },
    {
      path : '/pc/dataRange',
      name : 'dataRange',
      component: () =>
        import(/* webpackChunkName: "dataRange" */ "@/views/dataRange/dataRange.vue")
    //     import("@/views/dataRange/dataRange.vue")
    },
    {
      path : '/pc/playerInfor',
      name : 'playerInfor',
      component:()=>
        import(/* webpackChunkName: "playerInfor" */ "@/views/playerInfor/player.vue")
        // import("@/views/playerInfor/player.vue")
    },
    {
      path : '/pc/scheme',
      name : 'scheme',
      component:()=>
        import(/* webpackChunkName: "scheme" */ "@/views/scheme/sheme.vue")
        // import( "@/views/scheme/sheme.vue")
    }
  ]
});
