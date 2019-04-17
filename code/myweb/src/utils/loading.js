import Vue from 'vue';
import {Loading} from 'element-ui';

// Vue.use(Loading);
// 数据加载时的弹窗
export function myload(){
    return Loading.service({
        lock:true,
        text:'数据加载中，请稍候',
        spinner:'el-icon-loading',
        background:'rgba(0, 0, 0, 0.7)'
    })
     
}