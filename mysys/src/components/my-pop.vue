<template>
    <div class="my-pop-div">
        <el-dialog
            :title="mytitle"
            :visible="mypop"
            :width="mw"
            :append-to-body="true"
            :custom-class="myclass"
            :before-close="handleClose"
        >
            <slot name="pcont"></slot>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'mypop',
    props:['mytitle','mypop','mw','myclass'],
    methods:{
        handleClose(){
            this.$emit('closepop')
        }
    }
}
</script>
<style lang="scss">
    .my-pop-div{

    }
</style>