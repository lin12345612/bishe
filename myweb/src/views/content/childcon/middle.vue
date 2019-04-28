<template>
    <div class="middle-con">
        <router-view></router-view>
    </div>
</template>
<style lang="scss" scope>
    .middle-con{
        width: 1020px;
        min-height: 620px;
        margin: 0 auto;
        /* background: red; */
        position: relative;
        z-index: 9;
        background: #f0f0f0;
        border-radius: 5px;
    }

</style>