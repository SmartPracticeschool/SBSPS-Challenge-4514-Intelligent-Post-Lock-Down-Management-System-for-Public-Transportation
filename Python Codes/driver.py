
def driver(fb,twi,ins,lin,stc,qu):
 import appauth
 import facebook
 import insta
 from watson_developer_cloud import PersonalityInsightsV3
 import os

 print("Importing Twitter Data:")
 try:
	 appauth.twitter(twi)
 except: 
	 pass
 print("Importing facebook Data: ")
 try:
	 facebook.facebook(fb)
 except:
 	pass
 print("Importing Instagram Data: ")
 try:
 	insta.insta(ins)
 except:
 	pass
 print("Importing Linkedin Data :")
 try:
	url="python testlink.py "+link
	os.system(lin)
 except:
	pass
 print("Importing Quora Data :")
 try:
	url="python quora.py "+quo
	os.system(qu)
 except:
	pass
 print("Importing Stack Overflow Data :")
 try:
	url="python stackover.py "+stack
	os.system(stc)
 except:
	pass


 file2 = open(r"user.txt","w")
 try:
	file1 = open(r"tweet.txt","r")
	tweets=file1.read()
	for element in tweets:
        	file2.write('\n')
        	file2.write(element)
 except:
	pass

 try:
	file3=open(r"facebook.txt","r")
	fb=file3.read()     	
	for element in fb:
        	file2.write('\n')
        	file2.write(element)
 except:
	pass

 try:
	file4=open(r"insta.txt","r")
	instapos=file4.read() 
	for element in instapos:
        	file2.write('\n')
        	file2.write(element)
 except:
	pass

 try:
	file5=open(r"linkedin.txt","r") 
	linked=file5.read() 
	for element in linked:
        	file2.write('\n')
        	file2.write(element)
 except:
	pass
 try:
	file6=open(r"quora.text","r")
	quor=file6.read()
	for element in quor:
        	file2.write('\n')
        	file2.write(element)
 except:
	pass
 try:        	
	file7=open(r"stack.text","r")
	stackover=file7.read()
    for element in stackover:
        	file2.write('\n')
        	file2.write(element)
 except:
	pass
 file2.close()	

 import json


 url='https://gateway-lon.watsonplatform.net/personality-insights/api'
 apikey='NDdDCmUjHrnDr9sTreKFyn4Xj3g2MFpQMfMJlwBc_imz'
 service=PersonalityInsightsV3(url=url,iam_apikey=apikey,version='2019-07-22')
 data=open("user.txt","r")
 text=data.read()
 profile=service.profile(text,content_type='text/plain').get_result()
 print(type(profile))
 import csv
 '''csv_columns = ['No','Openness','Conscientiousness','Extraversion','Agreeableness','Emotional range','Challenge','Closeness','Curiosity','Excitement','Harmony','Ideal','Liberty','Love','Practicality','Self-expression','Stability','Structure','Conservation','Openness to change','Hedonism','Self-enhancement','Self-transcendence']

 with open('test.csv', 'w') as f:
    for key in profile.keys():
        f.write("%s,%s\n"%(key,my_dict[key]))'''
 avg= 3*profile['personality'][0]['percentile'],4*profile['personality'][1]['percentile'],2.5*profile['personality'][2]['percentile'],3*profile['personality'][3]['percentile'],3*profile['personality'][4]['percentile'],4*profile['needs'][0]['percentile'],2*profile['needs'][1]['percentile'],4*profile['needs'][2]['percentile'],3.5*profile['needs'][3]['percentile'],3.5*profile['needs'][4]['percentile'],3.5*profile['needs'][5]['percentile'],2*profile['needs'][6]['percentile'],2*profile['needs'][7]['percentile'],4*profile['needs'][8]['percentile'],3*profile['needs'][9]['percentile'],3*profile['needs'][10]['percentile'],3*profile['needs'][11]['percentile'],3*profile['values'][0]['percentile'],3.5*profile['values'][1]['percentile'],2.5*profile['values'][2]['percentile'],3*profile['values'][3]['percentile'],3*profile['values'][4]['percentile']
 avg=avg/68
 if avg>=0.85:
  status=3
 else if avg>=0.75 and avg<0.85:
  status=2
 else if avg>=0.65 and avg<0.75:
  status=1
 else:
  status=0    
 return {"Openness" :profile['personality'][0]['percentile'],"Conscientiousness":profile['personality'][1]['percentile'],"Extraversion":profile['personality'][2]['percentile'],"Aggreeablness":profile['personality'][3]['percentile'],"Emotional Range":profile['personality'][4]['percentile'],"Challenges":profile['needs'][0]['percentile'],"Closeness":profile['needs'][1]['percentile'],"Curiosity":profile['needs'][2]['percentile'],"Excitement":profile['needs'][3]['percentile'],"Harmony":profile['needs'][4]['percentile'],"Ideal":profile['needs'][5]['percentile'],"Liberty":profile['needs'][6]['percentile'],"Love":profile['needs'][7]['percentile'],"Practicality":profile['needs'][8]['percentile'],"Self-expression":profile['needs'][9]['percentile'],"Stability":profile['needs'][10]['percentile'],"Structure":profile['needs'][11]['percentile'],"Conservation":profile['values'][0]['percentile'],"Openness to change":profile['values'][1]['percentile'],"Hedonism":profile['values'][2]['percentile'],"Self-enhancement":profile['values'][3]['percentile'],"Self-transcendence":profile['values'][4]['percentile'],"Status":status}















