<template>
    <div class="team-select-page">
        <section 
            class="team-logo-sec"
            v-for="(item,index) in logoSrc"
            :key="index"
        >
            <div class="img-cover-div" @click="choseTeam(item.dm)">
                <p>{{item.dm}}</p>
                <img :src="item.lj" v-if="item.xs" class="team-img"/>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name : 'team-select',
    data(){
        return {
            logoSrc : [
                {
                    lj : '../images/logo/rocket.png',
                    dm : '火箭',
                    xs : false
                },
                {
                    lj : '../images/logo/spurs.png',
                    dm : '马刺',
                    xs : false
                },
                {
                    lj : '../images/logo/grizzlies.png',
                    dm : '灰熊',
                    xs : false
                },
                {
                    lj : '../images/logo/pelican.png',
                    dm : '鹈鹕',
                    xs : false
                },
                {
                    lj : '../images/logo/mavericks.png',
                    dm : '独行侠',
                    xs : false
                },
                {
                    lj : '../images/logo/warrior.png',
                    dm : '勇士',
                    xs : false
                },
                {
                    lj : '../images/logo/clipper.png',
                    dm : '快船',
                    xs : false
                },
                {
                    lj : '../images/logo/king.png',
                    dm : '国王',
                    xs : false
                },
                {
                    lj : '../images/logo/laker.png',
                    dm : '湖人',
                    xs : false
                },
                {
                    lj : '../images/logo/suns.png',
                    dm : '太阳',
                    xs : false
                },
                {
                    lj : '../images/logo/nuggets.png',
                    dm : '掘金',
                    xs : false
                },
                {
                    lj : '../images/logo/blazers.png',
                    dm : '开拓者',
                    xs : false
                },
                {
                    lj : '../images/logo/jazz.png',
                    dm : '爵士',
                    xs : false
                },
                {
                    lj : '../images/logo/thunder.png',
                    dm : '雷霆',
                    xs : false
                },
                {
                    lj : '../images/logo/timberwolves.png',
                    dm : '森林狼',
                    xs : false
                },
                {
                    lj : '../images/logo/raptors.png',
                    dm : '猛龙',
                    xs : false
                },
                {
                    lj : '../images/logo/76ers.png',
                    dm : '76人',
                    xs : false
                },
                {
                    lj : '../images/logo/celtics.png',
                    dm : '凯尔特人',
                    xs : false
                },
                {
                    lj : '../images/logo/nets.png',
                    dm : '篮网',
                    xs : false
                },
                {
                    lj : '../images/logo/knicks.png',
                    dm : '尼克斯',
                    xs : false
                },
                {
                    lj : '../images/logo/magic.png',
                    dm : '魔术',
                    xs : false
                },
                {
                    lj : '../images/logo/hornets.png',
                    dm : '黄蜂',
                    xs : false
                },
                {
                    lj : '../images/logo/heat.png',
                    dm : '热火',
                    xs : false
                },
                {
                    lj : '../images/logo/wizards.png',
                    dm : '奇才',
                    xs : false
                },
                {
                    lj : '../images/logo/hawks.png',
                    dm : '老鹰',
                    xs : false
                },
                {
                    lj : '../images/logo/bucks.png',
                    dm : '雄鹿',
                    xs : false
                },
                {
                    lj : '../images/logo/pacers.png',
                    dm : '步行者',
                    xs : false
                },
                {
                    lj : '../images/logo/pistons.png',
                    dm : '活塞',
                    xs : false
                },
                {
                    lj : '../images/logo/bulls.png',
                    dm : '公牛',
                    xs : false
                },
                {
                    lj : '../images/logo/cavaliers.png',
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
                this.imgLoad(imgArr[i].lj).then(()=>{
                    this.logoSrc[i].xs = true
                }).catch((err) =>{
                    console.log(err);
                })
            }
        },
        // 异步加载图片
        imgLoad(url){
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
        },
        choseTeam(val){
            this.$emit('xzTeam',{name:val})
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