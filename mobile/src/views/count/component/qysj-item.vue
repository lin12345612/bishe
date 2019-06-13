<template>
    <div class="qysj-item-div">
        <div class="qysj-title-div">
            <section class="item-left-sec">{{dxsj.title}}榜</section>
            <section class="item-right-sec">球队</section>
            <section class="item-right-sec">数据</section>
        </div>
    </div>
</template>
<script>
export default {
    name : 'qysjItem',
    props:['dxsj']
}
</script>
<style lang="scss">
    .qysj-item-div{
        padding-top: 10px;
        div{
            position: relative; 
        }
    }
    .qysj-title-div{
        display: flex;
        height: 30px;
        line-height: 30px;
        section{
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            font-size: 16px;
            box-sizing: border-box;
        }
    }
    .item-left-sec{
        width: 40%;
        height: 100%;
        padding-left: 10px;
    }
    .item-right-sec{
        width: 20%;
        height: 100%;
        text-align: center;
    }

</style>
