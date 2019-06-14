import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import router from './router'
import store from './store/store.js';
import './assets/font/iconfont.css';
import {Button ,TreeSelect,Tabbar, TabbarItem,
  PullRefresh,Loading,Toast,
  Tab, Tabs,Badge, BadgeGroup} from 'vant'
Vue.use(Button).use(Tabbar)
.use(TabbarItem).use(TreeSelect)
.use(PullRefresh).use(Loading).use(Toast)
.use(Tab).use(Tabs);
Vue.use(Badge).use(BadgeGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
