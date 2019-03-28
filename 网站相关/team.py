from requests_html import HTMLSession
import pandas as pd
seesion = HTMLSession()
url = 'https://nba.hupu.com/teams/celtics'
r = seesion.get(url)
sel = [
'div.gamecenter_content_l > div.team_list_data > div.jiben_title_table > div.a > div.x_list > span.c2>a',
'div.gamecenter_content_l > div.team_list_data > div.jiben_title_table > div.b > #table_post2>div.x_list>span.c5:nth-of-type(3)',
'div.gamecenter_content_l > div.team_list_data > div.jiben_title_table > div.b > #table_post2>div.x_list>span.c5:nth-of-type(4)',
'div.gamecenter_content_l > div.team_list_data > div.jiben_title_table > div.b > #table_post2>div.x_list>span.c5:nth-of-type(16)',
'div.gamecenter_content_l > div.team_list_data > div.jiben_title_table > div.b > #table_post2>div.x_list>span.c5:nth-of-type(5)',
'div.gamecenter_content_l > div.team_list_data > div.jiben_title_table > div.b > #table_post2>div.x_list>span.c5:nth-of-type(17)',
'div.gamecenter_content_l > div.team_list_data > div.jiben_title_table > div.b > #table_post2>div.x_list>span.c5:nth-of-type(18)',
'body div.gamecenter_content_l > div.team_list_data > div.jiben_title_table > div.a > div.x_list > span.c1'
]
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

newArr = []
length=len(arr[0])
for i in range(length):
    newArr.append([row[i] for row in arr])
df=pd.DataFrame(newArr)
df.columns=['球员','球队','得分','篮板','抢断','助攻','盖帽','号码']
df.to_csv('user.csv',encoding='gbk',index=False)
print('我执行好了')
'''
df=pd.DataFrame(get_text_link_from_sel(sel))
print(df)
df.columns=['text']
df.to_csv('output.csv',encoding='gbk',index=False)
'''

