from requests_html import HTMLSession
import pandas as pd
seesion = HTMLSession()
urlArr = ['http://www.stat-nba.com/player/4077.html','http://www.stat-nba.com/player/1183.html']
def getAllTeamData(url):
    r = seesion.get(url)
    sel = ['#stat_box_tot > tbody > tr > td.normal.tm.change_color > a',
    '#stat_box_avg > tbody > tr > td.current.season.change_color > a',
    '#stat_box_tot > tbody > tr > td.normal.pts.change_color',
    '#stat_box_tot > tbody > tr > td.normal.trb.change_color',
    '#stat_box_tot > tbody > tr > td.normal.stl.change_color',
    '#stat_box_tot > tbody > tr> td.normal.ast.change_color',
    '#stat_box_tot > tbody > tr > td.normal.blk.change_color']

    sel1 = ['#stat_box_avg > tbody > tr> td.normal.trb.change_color',
    '#stat_box_avg > tbody > tr > td.normal.ast.change_color',
    '#stat_box_avg > tbody > tr > td.normal.stl.change_color',
    '#stat_box_avg > tbody > tr > td.normal.blk.change_color',
    '#stat_box_avg > tbody > tr > td.normal.pts.change_color']
    sel2 = '.playerinfo > .name'


    # name=''


    arr=[]    #存储总数的数组
    arr1 = [] #存储平均数据的数据
    def get_text_link_from_sel(sel):
        mylist = []
        try:
            results = r.html.find(sel)
            for result in results:
                mytext = result.text
                mylist.append(mytext)
            return mylist
        except:
            return None

    # 获取名字
    newStr = (get_text_link_from_sel(sel2))[0]
    print(newStr)
    wz = newStr.index('/')
    name = newStr[0:wz]
    print(name)
    newArr = []
    # 处理总数据
    for index in range(len(sel)):
        arr.append(get_text_link_from_sel(sel[index]))

    for i in  range(len(arr[1])):
        # print(arr[1][i])
        str1 ='20' + arr[1][i][:2]
        str2 = '20' + arr[1][i][3:]
        str3 = str1 + '-' + str2
        arr[1][i] = str3
    length=len(arr[0])
    for i in range(length):
        newArr.append([row[i] for row in arr])
    # print(newArr)
    # 处理平均数据
    for index in range(len(sel1)):
        arr1.append(get_text_link_from_sel(sel1[index]))

    dArr = []
    for i in range(len(arr1[0])):
        str = arr1[0][i]+'篮板'+arr1[1][i]+'助攻'+arr1[2][i] + '抢断'+arr1[3][i]+'盖帽'+arr1[4][i]+'分'
        newArr[i].append(str)
        newArr[i].insert(0,name)
    print('执行好了')

    df=pd.DataFrame(newArr)
    df.to_csv('playerData.csv',encoding='gbk',index=False,mode='a',header=False)

for item in urlArr:
    getAllTeamData(item)

'''
df=pd.DataFrame(get_text_link_from_sel(sel))
print(df)
df.columns=['text']
df.to_csv('output.csv',encoding='gbk',index=False)
'''

