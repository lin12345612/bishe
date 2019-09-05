import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import router from './router'
import store from './store/store.js';
import './assets/font/iconfont.css';
import {Button ,TreeSelect,Tabbar, TabbarItem,Dialog,
  PullRefresh,Loading,Toast,Search,Icon,Uploader,
  Tab, Tabs,Sidebar, SidebarItem,Image,Lazyload,List,Cell,Picker,Popup} from 'vant'
Vue.use(Button).use(Tabbar).use(Cell).use(Uploader).use(Dialog)
.use(TabbarItem).use(TreeSelect).use(Search)
.use(PullRefresh).use(Loading).use(Toast)
.use(Tab).use(Tabs).use(Icon);
Vue.use(Sidebar).use(SidebarItem).use(Image).use(Lazyload)
.use(List).use(Cell).use(Picker).use(Popup);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
