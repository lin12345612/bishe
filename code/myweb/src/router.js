import Vue from "vue";
import Router from "vue-router";
import Range from "./views/trange/range.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/pc",
      name: "range",
      component: Range
    },
    {
      path: "/pc/teamInfor",
      name: "teamInfor",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/teamInfor/tinfor.vue")
    },
    {
      path : '/pc/dataRange',
      name : 'dataRange',
      component:()=>
        import("./views/dataRange/dataRange.vue")
    },
    {
      path : '/pc/playerInfor',
      name : 'playerInfor',
      component:()=>
        import("./views/playerInfor/player.vue")
    },
    ,
    {
      path : '/pc/scheme',
      name : 'scheme',
      component:()=>
        import("./views/scheme/sheme.vue")
    }
  ]
});
