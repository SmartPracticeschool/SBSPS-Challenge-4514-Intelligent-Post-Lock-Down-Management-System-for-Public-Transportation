import requests
import urllib.request
import urllib.parse
import urllib.error
from bs4 import BeautifulSoup
import ssl
import json


class Insta_Info_Scraper:

    def getinfo(self, url):
        html = urllib.request.urlopen(url, context=self.ctx).read()
        soup = BeautifulSoup(html, 'html.parser')
        data = soup.find_all('meta', attrs={'property': 'og:description'
                             })
        text = data[0].get('content').split()
        inputTag = soup.find(attrs={'type' :'application/ld+json'}).text
        #output = inputTag[0]['value']
        user = '%s %s %s' % (text[-3], text[-2], text[-1])
        followers = text[0]
        following = text[2]
        posts = text[4]
        print ('User:', user)
        print ('Followers:', followers)
        print ('Following:', following)
        print ('Posts:', posts)
        res=str(inputTag)
        d = json.loads(res)
        print("Profile Bio :"+d["description"])
                
        print ('---------------------------')
        file2 = open(r"insta.txt","w")
        file2.write("\nName: "+user)
        file2.write("\nFollowers "+followers)
        file2.write("\nFollowing "+following)
        file2.write("\nPosts "+posts)
        file2.write("Profile Bio: "+d["description"])
        file2.close()


    def main(self,url):
        self.ctx = ssl.create_default_context()
        self.ctx.check_hostname = False
        self.ctx.verify_mode = ssl.CERT_NONE
        self.getinfo(url)


def insta(user):
    obj = Insta_Info_Scraper()
    obj.main(url)