<template>
    <div class="area-div">
        <p class="area-title-p">{{title}}</p>
        <div class="team-outer-div">
            <div 
                class="single-team-div"
                v-for="(item,index) in qdArr"
                :key="index"
                @click="toTeamInfor(item.tid)"
            >
                <span class="qd-img-span">
                    <img :src="item.logoSrc">
                </span>
                <p class="team-p">{{item.tName}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name : 'team',
    props:['title','tx'],
    data(){
        return {
            qdArr :[]
        }
    },
    inject:['getTeamName'],
    created(){
        this.qdArr = this.$props.tx;
    },
    methods:{
        toTeamInfor(team){
            this.$router.push({
                name : 'teamInfor',
                query:{
                    team :team
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .area-div{
        position: relative;
        margin-bottom: 15px;
        &:nth-of-type(2){
            margin-bottom: 60px;
            box-shadow: 0 -1px 1px rgba(0,0,0,.1);
        }
        .area-title-p{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: 16px;
            background-color: #fff;
        }
        .team-outer-div{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-top: 10px;
            background-color: #f3f3f3;
            box-shadow: 1px 2px 2px rgba(0,0,0,.1);
            border-radius: 0 0 3px 3px;
        }
        .single-team-div{
            width: 110px;
            height: 60px;
            position: relative;
            background:#fff;
            background-size: 100% 100%;
            margin-bottom: 10px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            padding-left: 5px;
        }
        .qd-img-span{
            display: block;
            width: 50px;
            height: 50px;
            margin-right: 5px;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .team-p{
            font-size: 12px;
        }
    }
</style>


