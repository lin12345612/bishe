from requests_html import HTMLSession
import pandas as pd

seesion = HTMLSession()
urlArr = [
    {
        'url' : 'http://www.stat-nba.com/team/ATL.html',
        'name' : '老鹰'
    },
    {
        'url' : 'http://www.stat-nba.com/team/HOU.html',
        'name' : '火箭'
    },
    {
        'url' : 'http://www.stat-nba.com/team/SAS.html',
        'name' : '马刺'
    },
    {
        'url' : 'http://www.stat-nba.com/team/MEM.html',
        'name' : '灰熊'
    },
    {
        'url' : 'http://www.stat-nba.com/team/NOH.html',
        'name' : '鹈鹕'
    },
    {
        'url' : 'http://www.stat-nba.com/team/DAL.html',
        'name' : '独行侠'
    },
    {
        'url' : 'http://www.stat-nba.com/team/GSW.html',
        'name' : '勇士'
    },
    {
        'url' : 'http://www.stat-nba.com/team/LAC.html',
        'name' : '快船'
    },
    {
        'url' : 'http://www.stat-nba.com/team/SAC.html',
        'name' : '国王'
    },
    {
        'url' : 'http://www.stat-nba.com/team/LAL.html',
        'name' : '湖人'
    },
    {
        'url' : 'http://www.stat-nba.com/team/PHO.html',
        'name' : '太阳'
    },
    {
        'url' : 'http://www.stat-nba.com/team/DEN.html',
        'name' : '掘金'
    },
    {
        'url' : 'http://www.stat-nba.com/team/POR.html',
        'name' : '开拓者'
    },
    {
        'url' : 'http://www.stat-nba.com/team/UTA.html',
        'name' : '爵士'
    },
    {
        'url' : 'http://www.stat-nba.com/team/OKC.html',
        'name' : '雷霆'
    },
    {
        'url' : 'http://www.stat-nba.com/team/MIN.html',
        'name' : '森林狼'
    },
    {
        'url' : 'http://www.stat-nba.com/team/TOR.html',
        'name' : '猛龙'
    },
    {
        'url' : 'http://www.stat-nba.com/team/PHI.html',
        'name' : '76人'
    },
    {
        'url' : 'http://www.stat-nba.com/team/BOS.html',
        'name' : '凯尔特人'
    },
    {
        'url': 'http://www.stat-nba.com/team/BKN.html',
        'name' : '篮网'
    },
    {
        'url' : 'http://www.stat-nba.com/team/NYK.html',
        'name' : '尼克斯'
    },
    {
        'url' : 'http://www.stat-nba.com/team/ORL.html',
        'name' : '魔术'
    },
    {
        'url' : 'http://www.stat-nba.com/team/CHA.html',
        'name' : '黄蜂'
    },
    {
        'url' : 'http://www.stat-nba.com/team/MIA.html',
        'name' : '热火'
    },
    {
        'url' : 'http://www.stat-nba.com/team/WAS.html',
        'name' : '奇才'
    },
    {
        'url' : 'http://www.stat-nba.com/team/MIL.html',
        'name' : '雄鹿'
    },
    {
        'url' : 'http://www.stat-nba.com/team/IND.html',
        'name' : '步行者'
    },
    {
        'url' : 'http://www.stat-nba.com/team/DET.html',
        'name' : '活塞'
    },
    {
        'url' : 'http://www.stat-nba.com/team/CHI.html',
        'name' : '公牛'
    },
    {
        'url' : 'http://www.stat-nba.com/team/CLE.html',
        'name' : '骑士'
    }
]
print(len(urlArr))
# url="http://www.stat-nba.com/team/NYK.html"
# name="篮网"
def getTotal(ul1,team):
    r = seesion.get(ul1)
    sel = [
        '.sort .player_name a',
        '#stat_box_team > div:nth-child(2) > table > tbody > tr > td.current.pts.change_color.col21',
        '#stat_box_team > div:nth-child(2) > table > tbody > tr > td.normal.trb.change_color.col13',
        '#stat_box_team > div:nth-child(2) > table > tbody > tr > td.normal.ast.change_color.col16',
        '#stat_box_team > div:nth-child(2) > table > tbody > tr > td.normal.stl.change_color.col17',
        '#stat_box_team > div:nth-child(2) > table > tbody > tr > td.normal.blk.change_color.col18'
        ]
    def getLink(sel):
        mylist = []
        try:
            results = r.html.find(sel)
            for result in results:
                mytext = result.text
                mylist.append(mytext)
            return mylist
        except:
            return None
    arr = []
    for item in sel:
        arr.append(getLink(item))

    newArr = []
    for i in range(len(arr[0])):
        newArr.append([row[i] for row in arr])

    # print(newArr)
    for item in newArr:
        item.append(team)
    # print(newArr)
    df = pd.DataFrame(newArr)
    df.to_csv('场均数据.csv',encoding='gbk',index=False,mode='a')
    print('我执行完了')
for item in urlArr:
    getTotal(item['url'],item['name'])


