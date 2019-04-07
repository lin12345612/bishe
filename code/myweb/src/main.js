import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'static/icon/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Container,
  Main,Tabs,MenuItem,
  Header,Menu,Submenu
} from 'element-ui';
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Tabs);
Vue.use(Menu);
Vue.use(Submenu)
Vue.use(MenuItem)
// import axios from 'axios';
// Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
