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
    tf : false
}
export default state;