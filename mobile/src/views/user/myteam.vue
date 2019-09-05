<template>
    <div class="mt-outer-div">
        <common-head :title="title" @backBtn="backBtn">
            <p slot="opera" class="mp-opera-p" @click="operaTeam" v-if="$store.state.xhqd">{{btnText}}</p>
        </common-head>
        <div class="myteam-cover-div">
            <p class="hometeam-p">主队</p>
            <div class="like-team-sec">
                <p class="no-result-team-p"  v-if="likeArr && likeArr.length == 0">暂时没有喜欢的球队</p>
                <section 
                    class="team-item-sec"
                    v-for="(item,index) in likeArr"
                    :key="index"
                >
                    <div class="team-item-div" :class="{'has-chosen-div': isEdit}" @click="cancelTeam(index)">
                        <span class="img-cover-span">
                            <img :src="item.logoSrc">
                        </span>
                        <p class="team-name-p">{{item.tName}}</p>
                    </div>
                </section>
            </div>
            <p class="hometeam-p" v-show="isEdit">所有球队</p>
            <div class="team-item-cover-div" v-show="isEdit">
                <section 
                    class="team-item-sec"
                    v-for="(item,index) in teamArr"
                    :key="index"
                >
                    <div class="team-item-div" :class="{'has-chosen-div': isEdit && likeTid.includes(item.tid)}" @click="choseTeam(index)">
                        <span class="img-cover-span">
                            <img :src="item.logoSrc">
                        </span>
                        <p class="team-name-p">{{item.tName}}</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import commonHead from '@/components/user-head'
import {updateMyteam} from '@/api/myapi';
export default {
    name : 'myteam',
    components:{commonHead},
    beforeRouterLeave(to,from,next){
        next(()=>{
            this.isEdit = false;
        })
    },
    data(){
        return {
            title:'我的主队',
            btnText :'编辑',
            teamArr :[],
            isEdit :false,
            likeArr : [],
            likeTid : [],
            hasChange:false
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.initData();
        })
    },
    methods:{
        initData(){
            this.teamArr = this.$store.state.teamArr;
            let _str  = this.$store.state.xhqd;
            this.likeArr = [];
            this.likeTid = [];
            // console.log(_str);
            if(_str){
                _str = _str.split(',')
                for(let i = 0 ; i < _str.length;i++){
                    for(let j = 0 ; j < this.teamArr.length;j++){
                        if(_str[i] == this.teamArr[j].tid){
                            this.likeTid.push(_str[i])
                            this.likeArr.push(this.teamArr[j]);
                            break;
                        }
                    }
                }
            }
        },
        operaTeam(){
            if(this.btnText == '编辑'){
                this.isEdit = true;
                this.btnText = '保存'
            }else{
                // this.isEdit = false;
                // this.btnText = '编辑'
                // console.log(this.likeTid);
                updateMyteam(this.$store.state.user,this.likeTid).then(res=>{
                    let _str1 = '';
                    for(let i = 0 ; i < this.likeTid.length;i++){
                        if(i != this.likeTid.length-1){
                            _str1 += `${this.likeTid[i]},`
                        }else{
                            _str1 += `${this.likeTid[i]}`
                        }
                    }
                    this.$store.commit('changeQd',_str1);
                    this.$toast({
                        type : 'success',
                        message : '保存成功'
                    });
                    this.hasChange = false;
                    this.isEdit = false;
                    this.btnText = '编辑'
                }).catch(err=>{console.log(err);})
            }
        },
        // 取消喜欢
        cancelTeam(index){
            this.hasChange = true;
            if(this.isEdit){
                // console.log(index);
                this.likeArr.splice(index,1);
                this.likeTid.splice(index,1)
            }else{
                this.$router.push({
                    name : 'teamInfor',
                    query : {
                        team :this.likeArr[index].tid
                    }
                })
            }
        },
        // 回退按钮
        backBtn(){
            if(this.hasChange){
                this.$dialog.confirm({
                    title: '提示',
                    message: '您确定不保存就退出当前页面吗？'
                }).then(() => {
                    this.isEdit = false;
                    this.btnText = '编辑'
                    this.$router.go(-1);
                }).catch(() => {
                    this.$dialog.close();
                });
            }else{
                this.isEdit = false;
                this.$router.go(-1);
                this.btnText = '编辑'
            }
        },
        // 处理选择球队
        choseTeam(index){
            this.hasChange = true;
            let _tid = this.teamArr[index].tid;
            // console.log(_tid);
            let _index = this.likeTid.indexOf(_tid);
            if(_index != -1){
                this.likeArr.splice(_index,1);
                this.likeTid.splice(_index,1)
            }else{
                this.likeTid.push(_tid)
                this.likeArr.push(this.teamArr[index])
            }
        }
    }
}
</script>
<style lang="scss">
    .mt-outer-div{
        width: 100%;
        min-height: 100%;
        position: relative;
        overflow: hidden;
        background-color: #f5f5f5;
        padding: 60px 0 20px;
        box-sizing: border-box;
        div,p,section,span{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        .mp-opera-p{
            @include set-pt;
            right: 20px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            padding: 0;
            margin: 0;
        }
        .unclick{
            opacity: .3;
        }
        .myteam-cover-div{
            padding: 0 15px;
        }
        .hometeam-p{
            font-size: 14px;
            color: #f25a29;
            margin-bottom: 10px;
        }
        .team-item-cover-div{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }
        .team-item-sec{
            width: 115px;
            height: 110px;
            position: relative;
            margin-bottom: 10px;
            &:nth-of-type(3n){
                padding-left: 10px;
            }
            &:nth-of-type(3n+1){
                padding-right: 10px;
            }
            &:nth-of-type(3n+2){
                padding: 0 5px;
            }
            
        }
        .team-item-div{
            width: 100%;
            height: 100%;
            position: relative;
            border: 1px solid #ddd;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
        .img-cover-span{
            display: block;
            width: 80px;
            height: 80px;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .team-name-p{
            text-align: center;
            font-size: 14px;
            font-weight: 600;
        }
        .has-chosen-div{
            border:1px solid #f25a29;
            background-color: rgba(242,90,41,.04);
        }
        .like-team-sec{
            width: 100%;
            min-height: 120px;
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
        }
        .no-result-team-p{
            text-align: center;
            line-height: 120px;
            font-size: 16px;
            width: 100%;
        }
    }
</style>