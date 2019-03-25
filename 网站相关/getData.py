from requests_html import HTMLSession
import pandas as pd
seesion = HTMLSession()
url = 'http://www.stat-nba.com/player/1862.html'
r = seesion.get(url)
sel = ['#stat_box_tot > tbody > tr > td.normal.tm.change_color > a','#stat_box_tot > tbody > tr > td.normal.pts.change_color',
'#stat_box_tot > tbody > tr > td.normal.trb.change_color','#stat_box_tot > tbody > tr > td.normal.stl.change_color',
'#stat_box_tot > tbody > tr> td.normal.ast.change_color','#stat_box_tot > tbody > tr > td.normal.blk.change_color']
arr=[]
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
for itex in sel:
    arr.append(get_text_link_from_sel(itex))
print(arr)

newArr = []
length=len(arr[0])
for i in range(length):
    newArr.append([row[i] for row in arr])
print(newArr)

df=pd.DataFrame(newArr)
df.columns=['球队','得分','篮板','抢断','助攻','盖帽']
df.to_csv('output.csv',encoding='gbk',index=False)

'''
df=pd.DataFrame(get_text_link_from_sel(sel))
print(df)
df.columns=['text']
df.to_csv('output.csv',encoding='gbk',index=False)
'''

