<template>
    <div class="myteam-cover">
        <div class="filter-div">
            <div class="team-select-cover">
                <team-select @teamchange="handleTeam"></team-select>
            </div>
            <el-button type="primary">更新球员数据</el-button>
            <el-button type="primary">插入球员新赛季数据</el-button>
        </div>
        <div class="table-div">
            <table>
                <tr class="title-tr">
                    <td width="80px">id</td>
                    <td width="80px">分区</td>
                    <td  width="80px">队名</td>
                    <td  width="100px">全名</td>
                    <td  width="50px">胜场</td>
                    <td  width="50px">负场</td>
                    <td width="60px">胜率</td>
                    <td  width="100px">近况</td>
                    <td>描述</td>
                    <td>教练</td>
                    <td>球馆</td>
                    <td>头像地址</td>
                    <td>头像</td>
                    <td>操作</td>
                </tr>
                <tr 
                    class="common-tr"
                    v-for="(item,index) in teamArr"
                    :key="index"
                >
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.tid">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.part">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.tName">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.fName">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.wNum">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.fNum">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.rate">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.states">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.tDes">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.coach">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.groupName">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.logoSrc">
                    </td>
                    <td>
                        <div class="img-cover-div">
                            <span class="span-img">
                                <img :src="item.logoSrc" v-if="item.logoSrc">
                            </span>
                            <div class="chose-file">
                                <input type="file" @change="changeTx(index,$event)">
                            </div>
                            <el-button type="primary" @click="modifyTx(index)">确定</el-button>
                        </div>
                    </td>
                    <td>
                        <el-button type="primary">保存</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import teamSelect from '@/components/select-team';
export default {
    name : 'team',
    components:{teamSelect},
    data(){
        return {
            teamArr : [
                {
                    tid : 'wteam01',
                    part : '西部',
                    fName : '休斯顿火箭',
                    tName : '火箭',
                    wNum : 30,
                    fNum : 10,
                    rate : 0.75,
                    rank : 4,
                    states : '1连胜',
                    logoSrc : '../../images/logo/rocket.svg',
                    tDes : 'hahahahha',
                    coach : '德安东尼',
                    groupName : '丰田中心'
                }
            ]
        }
    },
    methods:{
        handleTeam(val){
            console.log(val);
        },
         // 更换头像
        changeTx(){
            let index = arguments[0];
            let _e = arguments[1].target.files[0];
            if(_e){
                let _url = URL.createObjectURL(_e)
                this.teamArr[index].imgUrl = _url;
                this.teamArr[index].imgfile = _e
            }
        },
        // 修改头像确定按钮
        modifyTx(index){
            let formd = new FormData();
            formd.append('myfile',this.teamArr[index].imgfile);
            formd.append('path',this.teamArr[index].imgSrc);
        },
    }
}
</script>
<style lang="scss">
    .myteam-cover{
        padding: 20px;
        position: relative;
        .filter-div{
            display: flex;
            margin-bottom: 20px;
        }
        .team-select-cover{
            width: 200px;
            position: relative;
            & + button{
                margin: 0 10px;
            }
        }
        .table-div{
            width: 100%;
            position: relative;
        }
        .td-inner-input{
            border:1px solid #eee;;
            width: 100%;
            height: 40px;
        }
        
        .img-cover-div{
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            position: relative;
        }
        .span-img{
            display: block;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: relative;
            margin-right: 10px;
            img{
                display: block;
                // width: 100%;
                height: 100%;
            }
        }
        .chose-file{
            width: 100px;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 99;
            opacity: 0;
        }
    }
</style>