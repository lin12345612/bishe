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
  Option,OptionGroup,Dialog,Input,DatePicker,Button,FormItem,Form
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
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Button)
Vue.use(DatePicker);
Vue.use(FormItem)
Vue.use(Form)

Vue.config.productionTip = false;
// router.onError(error=>{
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern) ;
//   const targetPath = router.history.pending.fullPath;
//   console.log(router.history.pending);
//   if(isChunkLoadFailed){
//     router.replace(targetPath);
//     // console.log('路径是'+targetPath);
//   }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
