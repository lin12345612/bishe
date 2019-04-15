from requests_html import HTMLSession
import pandas as pd

session = HTMLSession()
url='https://nba.hupu.com/standings'

r = session.get(url)
sel = [
    '#rank_js > div.left_box > div.rank_data > table > tbody > tr > td.left > a',
    '#rank_js > div.left_box > div.rank_data > table > tbody > tr > td:nth-child(3)',
    '#rank_js > div.left_box > div.rank_data > table > tbody > tr > td:nth-child(4)',
    '#rank_js > div.left_box > div.rank_data > table > tbody > tr > td:nth-child(5)'
]
def get_data(sel):
    mylist=[]
    try:
        results = r.html.find(sel)
        for result in results:
            mytext = result.text
            # print(result)
            mylist.append(mytext)
        return mylist
    except:
        return None

arr = []
for item in sel:
    arr.append(get_data(item))

tm = arr[0]

#处理胜场
pm = arr[1]
del pm[16]
del pm[0]

# 处理负场
fc = arr[2]
del fc[16]
del fc[0]

# 处理胜率
sl = arr[3]
del sl[16]
del sl[0]

newArr = []
for index in range(15):
    team = []
    team.append((index+1))
    team.append(tm[index])
    team.append(pm[index])
    team.append(fc[index])
    team.append(sl[index])
    newArr.append(team)
for ind in range(15):
    _in = ind+15
    team1 = []
    team1.append((ind+1))
    team1.append(tm[_in])
    team1.append(pm[_in])
    team1.append(fc[_in])
    team1.append(sl[_in])
    newArr.append(team1)

df=pd.DataFrame(newArr)
df.to_csv('球队排名.csv',encoding='gbk',index=False)
print('我执行完了')