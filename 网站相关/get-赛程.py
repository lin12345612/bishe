from requests_html import HTMLSession
import pandas as pd
session = HTMLSession()
url = ['https://nba.hupu.com/games/boxscore/157209',
  'https://nba.hupu.com/games/boxscore/157210',
  'https://nba.hupu.com/games/boxscore/157211',
  'https://nba.hupu.com/games/boxscore/157212',
  'https://nba.hupu.com/games/boxscore/157213',
  'https://nba.hupu.com/games/boxscore/157214',
  'https://nba.hupu.com/games/boxscore/157215',
  'https://nba.hupu.com/games/boxscore/157216',
  'https://nba.hupu.com/games/boxscore/157217',
  'https://nba.hupu.com/games/boxscore/157218',
  'https://nba.hupu.com/games/boxscore/157219'
  ]

def get_url(url1):
    r = session.get(url1)
    # 选择器数组
    sel = ['div.team_vs_box > div.team_b > div.message > p > a','div.team_vs_box > div.team_a > div.message > p > a',
    'div.team_vs_box > div.team_b > div.message > h2','div.team_vs_box > div.team_a > div.message > h2',
    '#J_home_content > tbody > tr > td.tdw-1.left > a','#J_home_content > tbody > tr > td:nth-child(9)',
    '#J_home_content > tbody > tr > td:nth-child(10)','#J_home_content > tbody > tr > td:nth-child(12)',
    '#J_home_content > tbody > tr > td:nth-child(14)','#J_home_content > tbody > tr > td:nth-child(15)',
    '#J_away_content > tbody > tr > td.tdw-1.left > a','#J_away_content > tbody > tr > td:nth-child(9)',
    '#J_away_content > tbody > tr > td:nth-child(10)','#J_away_content > tbody > tr > td:nth-child(12)',
    '#J_away_content > tbody > tr > td:nth-child(14)','#J_away_content > tbody > tr > td:nth-child(15)',
    'div.yuece_num > div.yuece_num_b > a.a','div.team_vs > div.about_fonts.clearfix > p.time_f'
    ]
    #数据数组
    arr=[]
    def get_data(sel):
        mylist = []
        try:
            results = r.html.find(sel)
            for result in results:
                mytext = result.text
                if(mytext == '比赛战报'):
                    mylist.append(result.absolute_links)
                else :
                    mylist.append(mytext)
            return mylist
        except:
            return None
    for index in range(len(sel)):
        arr.append(get_data(sel[index]))
    # print(arr)
    def del_arr(arr1,arr2):
        del arr1[0]
        del arr1[len(arr1)-1]
        del arr1[len(arr1)-1]
        del arr1[5]
        for index in range(len(arr1)):
            arr1[index] = int(arr1[index])    
        _max = max(arr1)
        _index = arr1.index(_max)
        return {'val':_max,'player':arr2[_index]}
    # print(arr[3])
    if(arr[3][0] == ''):
        # print('我还没有开赛')
        # 处理主队各项数据
        str1 = ''
        hp = ''
        hpp = ''
        hr = ''
        hrp = ''
        ha = ''
        hap = ''
        hs = ''
        hsp = ''
        hb = ''
        hbp = ''
        #处理客队各项数据
        ap = ''
        app = ''
        ar = ''
        arp = ''
        aa = ''
        aap = ''
        ass = ''
        asp = ''
        ab = ''
        abp = ''
        _link = 'http://www.nball.cc/'
        hscore = ''
        ascore = ''
        done = '否'
    else:
        # print('我比完了')
        # 处理主队各项数据
        zreb = del_arr(arr[5],arr[4])
        zass = del_arr(arr[6],arr[4])
        zsteal = del_arr(arr[7],arr[4])
        zblo = del_arr(arr[8],arr[4])
        zpoi = del_arr(arr[9],arr[4])

        #处理客队各项数据
        kreb = del_arr(arr[11],arr[10])
        kass = del_arr(arr[12],arr[10])
        ksteal = del_arr(arr[13],arr[10])
        kblo = del_arr(arr[14],arr[10])
        kpoi = del_arr(arr[15],arr[10])

        str1 = arr[2][0]+' : '+arr[3][0]
        hp = zpoi['val']
        hpp = zpoi['player']
        hr = zreb['val']
        hrp = zreb['player']
        ha = zass['val']
        hap = zass['player']
        hs = zsteal['val']
        hsp = zsteal['player']
        hb = zblo['val']
        hbp = zblo['player']

        ap = kpoi['val']
        app = kpoi['player']
        ar = kreb['val']
        arp = kreb['player']
        aa = kass['val']
        aap = kass['player']
        ass = ksteal['val']
        asp = ksteal['player']
        ab = kblo['val']
        abp = kblo['player']
        print(arr[16])
        if(arr[16]):
            _link = list(arr[16][0])[0]
            done='是'
            # print('我有值')
        else:
            _link = ''
            done='否'
            # print('我没有值')
        
        hscore = arr[2][0]
        ascore = arr[3][0]
    str11 = arr[17][0]
    tStr = str11[3:7] + "-"+str11[8:10]+'-' + str11[11:13]
    # print(tStr)
    # print(_link)
    dataArr = [[tStr,done,arr[0][0],arr[1][0],str1,hscore,ascore,hp,hpp,hr,hrp,ha,hap,hs,hsp,hb,hbp,ap,app,ar,arp,aa,aap,ass,asp,ab,abp,_link,url1]]
    # print(dataArr)

    df= pd.DataFrame(dataArr)
    # df.columns = ['时间','完赛','主队','客队','比分','主队得分','客队得分','主队最高得分','主队最高得分球员','主队最高篮板','主队最高篮板球员','主队最高助攻','主队最高助攻球员','主队最高抢断',
    # '主队最高抢断球员','主队最高盖帽','主队最高盖帽球员','客队最高得分','客队最高得分球员','客队最高篮板','客队最高篮板球员','客队最高助攻','客队最高助攻球员','客队最高抢断'
    # ,'客队最高抢断球员','客队最高盖帽','客队最高盖帽球员','新闻链接','数据链接']
    df.to_csv('赛程.csv',encoding='gbk',index=False,mode='a',header=False)
														
for item in url:
    # print(item)
    get_url(item)
print('我执行完了')
# get_url(url[0])
