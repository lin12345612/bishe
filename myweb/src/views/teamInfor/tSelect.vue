<template>
    <div class="team-select-page">
        <section 
            class="team-logo-sec"
            v-for="(item,index) in logoSrc"
            :key="index"
        >
            <div class="img-cover-div" @click="choseTeam(item.dm)">
                <p>{{item.dm}}</p>
                <img :src="getLj(item.lj)" v-if="item.xs" class="team-img"/>
            </div>
        </section>
    </div>
</template>
<script>
import {imgLoad} from '@/utils/loading';
export default {
    name : 'team-select',
    data(){
        return {
            logoSrc : [
                {
                    lj : '../../images/logo/rocket.svg',
                    dm : '火箭',
                    xs : false
                },
                {
                    lj : '../../images/logo/spurs.svg',
                    dm : '马刺',
                    xs : false
                },
                {
                    lj : '../../images/logo/grizzlies.svg',
                    dm : '灰熊',
                    xs : false
                },
                {
                    lj : '../../images/logo/pelican.svg',
                    dm : '鹈鹕',
                    xs : false
                },
                {
                    lj : '../../images/logo/mavericks.svg',
                    dm : '独行侠',
                    xs : false
                },
                {
                    lj : '../../images/logo/warrior.svg',
                    dm : '勇士',
                    xs : false
                },
                {
                    lj : '../../images/logo/clipper.svg',
                    dm : '快船',
                    xs : false
                },
                {
                    lj : '../../images/logo/king.svg',
                    dm : '国王',
                    xs : false
                },
                {
                    lj : '../../images/logo/laker.svg',
                    dm : '湖人',
                    xs : false
                },
                {
                    lj : '../../images/logo/suns.svg',
                    dm : '太阳',
                    xs : false
                },
                {
                    lj : '../../images/logo/nuggets.svg',
                    dm : '掘金',
                    xs : false
                },
                {
                    lj : '../../images/logo/blazers.svg',
                    dm : '开拓者',
                    xs : false
                },
                {
                    lj : '../../images/logo/jazz.svg',
                    dm : '爵士',
                    xs : false
                },
                {
                    lj : '../../images/logo/thunder.svg',
                    dm : '雷霆',
                    xs : false
                },
                {
                    lj : '../../images/logo/timberwolves.svg',
                    dm : '森林狼',
                    xs : false
                },
                {
                    lj : '../../images/logo/raptors.svg',
                    dm : '猛龙',
                    xs : false
                },
                {
                    lj : '../../images/logo/76ers.svg',
                    dm : '76人',
                    xs : false
                },
                {
                    lj : '../../images/logo/celtics.svg',
                    dm : '凯尔特人',
                    xs : false
                },
                {
                    lj : '../../images/logo/nets.svg',
                    dm : '篮网',
                    xs : false
                },
                {
                    lj : '../../images/logo/knicks.svg',
                    dm : '尼克斯',
                    xs : false
                },
                {
                    lj : '../../images/logo/magic.svg',
                    dm : '魔术',
                    xs : false
                },
                {
                    lj : '../../images/logo/hornets.svg',
                    dm : '黄蜂',
                    xs : false
                },
                {
                    lj : '../../images/logo/heat.svg',
                    dm : '热火',
                    xs : false
                },
                {
                    lj : '../../images/logo/wizards.svg',
                    dm : '奇才',
                    xs : false
                },
                {
                    lj : '../../images/logo/hawks.svg',
                    dm : '老鹰',
                    xs : false
                },
                {
                    lj : '../../images/logo/bucks.svg',
                    dm : '雄鹿',
                    xs : false
                },
                {
                    lj : '../../images/logo/pacers.svg',
                    dm : '步行者',
                    xs : false
                },
                {
                    lj : '../../images/logo/pistons.svg',
                    dm : '活塞',
                    xs : false
                },
                {
                    lj : '../../images/logo/bulls.svg',
                    dm : '公牛',
                    xs : false
                },
                {
                    lj : '../../images/logo/cavaliers.svg',
                    dm : '骑士',
                    xs : false
                }
            ]
        }
    },
    created(){
        this.handleImg()
    },
    methods: {
        // 处理图片
        handleImg(){
            var imgArr = this.logoSrc;
            for(let i = 0; i < imgArr.length;i++){
                imgLoad(imgArr[i].lj).then(()=>{
                    this.logoSrc[i].xs = true
                }).catch((err) =>{
                    console.log(err);
                })
            }
        },
        choseTeam(val){
            this.$emit('xzTeam',{name:val})
        },
        getLj(lj){
            return '../../images/'+lj;
        }
    },
}

</script>
<style lang="scss"scope>
    .team-select-page{
        width: 100%;
        height: 100%;
        position: relative;
        display:flex;
        justify-content:space-between;
        flex-wrap: wrap;
    }
    .team-logo-sec{
        width: 15%;
        height: 80px;
        margin-bottom: 25px;
    }
    .img-cover-div{
        width: 80px;
        height: 80px;
        margin:  0 auto;
        position: relative;
        cursor: pointer;
        background: rgba(255, 255, 255, .5);
        border:1px solid #ddd;
        &:hover{
            p{
                display: block;
            }
        }
        p{
            display: none;
            position: absolute;
            width: 100%;
            height:100%;
            top:0;
            left: 0;
            background: rgba(230, 88, 42,.6);
            line-height: 80px;
            text-align: center;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
        }
        .team-img{
            display: block;
            width: 100%;
            height:100%;
        }
    }
</style>