import gspread
from oauth2client.service_account import ServiceAccountCredentials
import sqlite3

conn = sqlite3.connect('test.db')

cursor = conn.execute("SELECT Company Name from DATA")
comname=cursor[0]
   

print ("Operation done successfully")
conn.close()


# use creds to create a client to interact with the Google Drive API
scope =  ["https://spreadsheets.google.com/feeds",'https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)

# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet = client.open("compreg").sheet1

# Extract and print all of the values
list_of_hashes = sheet.get_all_records()
for i in range(1,300):
	sheet.delete_row(i)
print(type(list_of_hashes))
f = open(comname, "w")
import csv

writer = csv.DictWriter(f, fieldnames=['Openness','Conscientiousness','Extraversion','Agreeableness','Emotional range','Challenge','Closeness','Curiosity','Excitement','Harmony','Ideal','Liberty','Love','Practicality','Self-expression','Stability','Structure','Conservation','Openness to change','Hedonism','Self-enhancement','Self-transcendence','Status'])
writer.writeheader()
for items in list_of_hashes:
	dat=driver(items['Facebook Link'],items['Twitter Username'],items['Instagram Link'],items['Linkedin Link'],items['StackOverflow Link'],items['Quora Link'])
	with open(comname,'a') as f:
		w = csv.writer(f)
		w.writerow(dat.values())

