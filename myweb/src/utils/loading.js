// import Vue from 'vue';
import {Loading,MessageBox} from 'element-ui';


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
// 提示消息
export function myMessage(str){
    return MessageBox.alert(str,'温馨提醒',{
        confirmButtonText :'确定'
    })
}

// 图片预加载
export function imgLoad(url){
    return new Promise((resolve,reject) =>{
        var image = new Image(url);
        image.onload = function(){
            resolve(image);
        }
        image.onerror = function(){
            reject('图片加载出错')
        }
        image.src = url;
    })
}