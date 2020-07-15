import sqlite3
import driver

conn = sqlite3.connect('test.db')

cursor = conn.execute("SELECT Full Name, Date of Birth,Gender,Facebook Link,Twitter Username,Instagram Link,Linkedin Link,StackOverflow Link,Quora Link,Company from DATA")
fb=cursor[3]
twi=cursor[4]
ins=cursor[5]
lin=cursor[6]
sta=cursor[7]
qu=cursor[8]
comname=cursor[9]
dat=driver(fb,twi,ins,lin,sta,qu)
f = open("userdat.text", "w")
import csv

writer = csv.DictWriter(f, fieldnames=['Openness','Conscientiousness','Extraversion','Agreeableness','Emotional range','Challenge','Closeness','Curiosity','Excitement','Harmony','Ideal','Liberty','Love','Practicality','Self-expression','Stability','Structure','Conservation','Openness to change','Hedonism','Self-enhancement','Self-transcendence','Status'])
writer.writeheader()
w = csv.writer(f)
w.writerow(dat.values())


import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split
df = pd.read_csv(comname)
df = df.fillna(0)

from sklearn import datasets 
from sklearn.metrics import confusion_matrix 
from sklearn.model_selection import train_test_split 

X = df.drop(columns='Status')
Y = df.Status
encoded = pd.get_dummies(X)
from sklearn.tree import DecisionTreeClassifier
classifier = DecisionTreeClassifier()  
classifier.fit(X,Y)
df = pd.read_csv(comname)
df = df.fillna(0)
X = df.drop(columns='Status')
Y=df.Status
val=classifier.score(X,Y)
res=classifier.predict(X)
out=open("output.text",'w')
out.write("Candidate's Personal & Professional Insights\n")
out.write(str(dat))
if res==0:
	status="Not Suitable"
else if res==1:
	status="Merely Suitable"
else if res==2:
	status="Suitable"
else:
	status="Highly Suitable"

out.write("Your Status for joining the Company :")
out.write(status)
out.write("Your Suitability Score :")
out.write(val)
out.close()


