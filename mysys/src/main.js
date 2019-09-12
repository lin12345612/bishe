import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

import {Input,Button,Select,Dialog,Checkbox,
  DatePicker,Option} from 'element-ui'
Vue.use(Input).use(Button).use(Select).use(Option).use(Dialog).use(DatePicker)
.use(Checkbox)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
