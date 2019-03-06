import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
// const Book = () => import('./components/test1/book.vue')
// const Chair = () => import('./components/test1/chair.vue')
// const Table1 = () => import('./components/test1/table.vue')
import Enter1 from './components/enter/entering'
Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "enter",
      component: Enter1
    },
    {
      path: "/book",
      name: "book",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import('./components/test1/book.vue')
    },
    {
      path: "/chair",
      name: "chair",
      component: () =>
        import('./components/test1/chair.vue')
    },
    {
      path: "/table1",
      name: "table1",
      component: () =>
        import('./components/test1/table1.vue')
    }
  ]
});
