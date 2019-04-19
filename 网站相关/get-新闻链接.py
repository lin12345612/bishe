from requests_html import HTMLSession
import pandas as pd
session = HTMLSession()

# url=["https://nba.hupu.com/teams/rockets"]
urlArr = [
    {
        'url' : 'https://nba.hupu.com/teams/hawks',
        'name' : '老鹰'
    },
    {
        'url' : 'https://nba.hupu.com/teams/rockets',
        'name' : '火箭'
    },
    {
        'url' : 'https://nba.hupu.com/teams/spurs',
        'name' : '马刺'
    },
    {
        'url' : 'https://nba.hupu.com/teams/grizzlies',
        'name' : '灰熊'
    },
    {
        'url' : 'https://nba.hupu.com/teams/pelicans',
        'name' : '鹈鹕'
    },
    {
        'url' : 'https://nba.hupu.com/teams/mavericks',
        'name' : '独行侠'
    },
    {
        'url' : 'https://nba.hupu.com/teams/warriors',
        'name' : '勇士'
    },
    {
        'url' : 'https://nba.hupu.com/teams/clippers',
        'name' : '快船'
    },
    {
        'url' : 'https://nba.hupu.com/teams/kings',
        'name' : '国王'
    },
    {
        'url' : 'https://nba.hupu.com/teams/lakers',
        'name' : '湖人'
    },
    {
        'url' : 'https://nba.hupu.com/teams/suns',
        'name' : '太阳'
    },
    {
        'url' : 'https://nba.hupu.com/teams/nuggets',
        'name' : '掘金'
    },
    {
        'url' : 'https://nba.hupu.com/teams/blazers',
        'name' : '开拓者'
    },
    {
        'url' : 'https://nba.hupu.com/teams/jazz',
        'name' : '爵士'
    },
    {
        'url' : 'https://nba.hupu.com/teams/thunder',
        'name' : '雷霆'
    },
    {
        'url' : 'https://nba.hupu.com/teams/timberwolves',
        'name' : '森林狼'
    },
    {
        'url' : 'https://nba.hupu.com/teams/raptors',
        'name' : '猛龙'
    },
    {
        'url' : 'https://nba.hupu.com/teams/76ers',
        'name' : '76人'
    },
    {
        'url' : 'https://nba.hupu.com/teams/celtics',
        'name' : '凯尔特人'
    },
    {
        'url': 'https://nba.hupu.com/teams/nets',
        'name' : '篮网'
    },
    {
        'url' : 'https://nba.hupu.com/teams/knicks',
        'name' : '尼克斯'
    },
    {
        'url' : 'https://nba.hupu.com/teams/magic',
        'name' : '魔术'
    },
    {
        'url' : 'https://nba.hupu.com/teams/hornets',
        'name' : '黄蜂'
    },
    {
        'url' : 'https://nba.hupu.com/teams/heat',
        'name' : '热火'
    },
    {
        'url' : 'https://nba.hupu.com/teams/wizards',
        'name' : '奇才'
    },
    {
        'url' : 'https://nba.hupu.com/teams/bucks',
        'name' : '雄鹿'
    },
    {
        'url' : 'https://nba.hupu.com/teams/pacers',
        'name' : '步行者'
    },
    {
        'url' : 'https://nba.hupu.com/teams/pistons',
        'name' : '活塞'
    },
    {
        'url' : 'https://nba.hupu.com/teams/bulls',
        'name' : '公牛'
    },
    {
        'url' : 'https://nba.hupu.com/teams/cavaliers',
        'name' : '骑士'
    }
]
def getAllNew(item):
    r = session.get(item['url'])
    sel='body > div.gamecenter_livestart > div.gamecenter_content > div.gamecenter_content_l > div.team_news > div.team_news_a > ul > li > a'
    arr = []
    def getNews(sel):
        mylist = []
        try:
            results = r.html.find(sel)
            for result in results:
                mytext = result.text
                print(result.absolute_links)
                mylink = list(result.absolute_links)[0]
                mylist.append([mytext,mylink])
            return mylist
        except:
            return None
    arr.append(getNews(sel))
    name = item['name']
    for item in arr[0]:
        item.append(name)
    # print(arr[0])
    df=pd.DataFrame(arr[0])

    df.to_csv('球队新闻.csv',encoding='gbk',index=False,mode='a')
    print('我执行好了')
for item in urlArr:
    getAllNew(item)
