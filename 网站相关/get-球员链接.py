from requests_html import HTMLSession
import pandas as pd

seesion = HTMLSession()
url = 'http://www.stat-nba.com/team/MIL.html'
r = seesion.get(url)
sel = '.sort .player_name a'
def getLink(sel):
    mylist = []
    try:
        results = r.html.find(sel)
        for result in results:
            mytext = result.text
            # print(result.absolute_links)
            # mylist.append(mytext)
            mylink = list(result.absolute_links)[0]
            # print(mylink)
            mylist.append([mytext,mylink])
        return mylist
    except:
        return None
arr = getLink(sel)
df = pd.DataFrame(arr)
df.to_csv('link.csv',encoding='gbk',index=False)
print('我执行完了')
# http://www.stat-nba.com/team/MIA.html
# 
# 
# 
# http://www.stat-nba.com/team/IND.html
# http://www.stat-nba.com/team/DET.html
# http://www.stat-nba.com/team/CHI.html
# http://www.stat-nba.com/team/CLE.html

