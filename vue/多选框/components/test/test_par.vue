<template>
 <div>
        <aa class="abc" v-model="test" ></aa> 
        {{'外面的值：' + test}} 
        <button @click="fn"> 外面改变里面</button>
 </div>
</template>
<script>
import aa from './test_child.vue'
 export default {
  data () {
   return {
    test: ''
   }
  },
  methods: {
   fn () {
    this.test += 1 
   }
  },
  components:{
   aa
  }
 }
</script>