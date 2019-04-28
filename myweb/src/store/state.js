const state = {
    // 菜单
    menuArr : [
        {
            val : '战绩排行',
            path : 'range',
            cn : 'myweb-icon-ranks'
        },
        {
            val : '球队情况',
            path : 'teamInfor',
            cn : 'myweb-icon-team'
        },
        {
            val : '数据排行',
            path : 'dataRange',
            cn : 'myweb-icon-data'

        },
        {
            val : '球员',
            path : 'playerInfor',
            cn : 'myweb-icon-qy'
        },
        {
            val : '赛程',
            path : 'scheme',
            cn : 'myweb-icon-scheme'
        }
    ],
    // 用于标志导航栏样式
    mf:0,
    // 用于判断球队详情页的进入方式
    tf : true,
    // 用于弹出数据排行层
    df:false,
    // 传递数据到弹出层
    project : '',
    // 用于判断进入球员详情页的方式,默认是通过导航进入页面，如果通过点击球员姓名进去，则为false
    pf : true ,
    // 球员姓名以及所在球队
    qyxx:{
        xm : '',
        qd : ''
    }
}
export default state;