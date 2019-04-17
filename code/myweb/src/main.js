import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import 'element-ui/lib/theme-chalk/index.css';
import 'static/icon/iconfont.css';

import {
  Container,
  Main,Tabs,MenuItem,
  Header,Menu,Submenu,
  Table,TableColumn,Select,
  Option,OptionGroup
} from 'element-ui';

import store from './store/store'
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Tabs);
Vue.use(Menu);
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup)
// import axios from 'axios';
// Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
