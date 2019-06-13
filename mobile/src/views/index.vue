<template>
    <div class="mymobile-couter-div">
        <layout>
            <keep-alive slot="content">
                <router-view ></router-view>
            </keep-alive>
        </layout>
    </div>
</template>
<script>
import Layout from '../components/layout.vue';
export default {
    name : 'index',
    components:{Layout}
}
</script>
<style lang="scss" scoped>
    .mymobile-couter-div{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>


