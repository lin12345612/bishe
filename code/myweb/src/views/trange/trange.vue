<template>
    <div class="team-range">
        <p class="range-team-title">{{title}}排名</p>
        <el-table
            :data="dataArr"
            style="width:100%"
            cell-style="text-align:center"
            header-cell-class-name="title-td"
        >
            <el-table-column
                label="排名"
                width="60"
            >
                <template slot-scope="scope">
                    <p class="range-common-p" :class="cnArr[scope.$index]">{{scope.$index+1}}<span></span></p>
                </template>
            </el-table-column>
            <el-table-column
                label="队名"
                width="120"
            >
            <template slot-scope="scope">
                <a href="javascript:;" class="team-a" @click="showTeamDetail(scope.row.tName,scope.$index+1)">{{scope.row.tName}}</a>
            </template>
            </el-table-column>
            <el-table-column
                width="80"
                label="胜负"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.wNum}}/{{scope.row.fNum}}</p>
                </template>
            </el-table-column>
            <el-table-column
                label="胜率"
                width="80"
                porp="rate"
                :formatter="handleRate"
            >
            </el-table-column>
            <el-table-column
                prop="states"
                label="近况"
                width="100"
            ></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'child-range',
    data(){
        return {
            cnArr:['p-one','p-two','p-san','p-si','p-si','p-si','p-si','p-si','p-other','p-other','p-other','p-other','p-other','p-other','p-other']
        }
    },
    methods: {
        handleRate(row,column){
            var _rate = (row.rate*100).toFixed(1)+'%';
            return _rate;
        },
        showTeamDetail(val,index){
            this.$store.dispatch('actChangeMf',1)
            this.$store.dispatch('actChangeTf',false)
            this.$router.push({name:'teamInfor',params:{team:val,range:index,title:this.$props.title}})
        }
    },
    props:['title','dataArr']
}
</script>
<style lang="scss" scope>
    .team-range{
        width: 480px;
        padding: 10px;
        position: relative;
        border: 1px solid #ddd;
        .title-td{
            text-align: center;
        }
    }
    .range-team-title{
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        color: #666;
        height: 30px;
    }
    .range-common-p{
        text-align: center;
        font-size: 18px;
    }
    .p-one{
        color: #c72222;
        font-weight: 600;
        position: relative;
        span{
            display:block;
            width:22px;
            height:22px;
            border-radius:50%;
            position: absolute;
            border:1px solid #c72222;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        }
    }
    .p-two{
        color: #ab4e22;
        font-weight: 500;
        span{
            display:block;
            width:22px;
            height:22px;
            border-radius:50%;
            position: absolute;
            border:1px solid #ab4e22;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        }
    }
    .p-san{
        color: #c39d48;
        span{
            display:block;
            width:22px;
            height:22px;
            border-radius:50%;
            position: absolute;
            border:1px solid #c39d48;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        }
    }
    .p-si{
        color: #aeb53d;
    }
    .team-a{
        color: #333;
        text-decoration: none;
        font-size: 16px;
        &:hover{
            text-decoration: underline;
        }
    }
</style>