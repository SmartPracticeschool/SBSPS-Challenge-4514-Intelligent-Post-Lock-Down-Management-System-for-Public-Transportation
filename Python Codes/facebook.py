from selenium import webdriver
import time
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC



def facebook(user):
  from selenium import webdriver
  import time
  from selenium.webdriver.chrome.options import Options
  from selenium.webdriver.support.ui import WebDriverWait
  from selenium.webdriver.common.by import By
  from selenium.webdriver.support import expected_conditions as EC
  chrome_options = Options()
  chrome_options.add_argument("--disable-user-media-security=true")
  chrome_options = webdriver.ChromeOptions()
  prefs = {"profile.default_content_setting_values.notifications" : 2}
  chrome_options.add_experimental_option("prefs",prefs)
  driver = webdriver.Chrome(chrome_options=chrome_options)
  from selenium.webdriver.common.keys import Keys
  driver = webdriver.Chrome('C:/Users/Computerist/Downloads/chromedriver',options=chrome_options)
  window_before = driver.window_handles[0]
  driver.get('https://en-gb.facebook.com/login/')
  username = driver.find_element_by_xpath("//input[@name='email']")
  username.send_keys("amit27.ssg@gmail.com")
  time.sleep(5)
  password = driver.find_element_by_xpath("//input[@type='password']")
  password.send_keys('hello kitty')
  time.sleep(5)
  sign_in_button = driver.find_element_by_xpath('//button[@type="submit"]')# .click() to mimic button click
  sign_in_button.click()
  time.sleep(5)
  driver.get(user)
  time.sleep(8)
  page=driver.find_element_by_tag_name("html")
  SCROLL_PAUSE_TIME = 2# Get scroll height
  file2 = open(r"facebook.txt","w")
  time.sleep(8)
  name = driver.find_element_by_xpath("//span[@id='fb-timeline-cover-name']")
  print(name.text)
  file2.write("Name: "+name.text)
  try:
    bio=driver.find_element_by_xpath("//div[@class='_50f9 _50f3']")
    file2.write("\nBio "+bio.text)
  except:
    pass
  try:
    personaldata=driver.find_elements_by_xpath("//div[@class='_50f3']")
    file2.write("\nPersonal Data")
    for element in personaldata:
      file2.write('\n')
      file2.write(element)
  except:
    pass
  try:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
  except:
      pass
  time.sleep(5)
  while True:
      last_height = driver.execute_script("return document.body.scrollHeight")
      driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
      # Wait to load page
      time.sleep(SCROLL_PAUSE_TIME)# Calculate new scroll height and compare with last scroll height
      new_height = driver.execute_script("return document.body.scrollHeight")
      if new_height == last_height:
        break
      last_height = new_height
  try:
        posts=driver.find_elements_by_xpath("//div[@class='_5pbx userContent _3576']")
        file2.write("\nPosts")
        for element in posts:
          file2.write('\n')
          file2.write(element)
  except:
        pass
  try:
        shareddata=driver.find_elements_by_xpath("//div[@class='mtm_5pco']")
        file2.write("\nShared Data:")
        for element in shareddata:
          file2.write('\n')
          file2.write(element)
  except:
        pass
  try:
        sharedlink=driver.find_elements_by_xpath("//div[@class='_6m7_3bt9']")
        file2.write("\nShared Links:")
        for element in sharedlink:
          file2.write('\n')
          file2.write(element)
  except:
          pass
  try:
          combtn=driver.find_element_by_xpath('//a[@class="_4sxc _42ft"]')
          for items in combtn:
            items.click()
  except:
          pass    
  try:
          comments=driver.find_elements_by_xpath("//div[@class='_72vr']")
          print(WebDriverWait(driver, 20).until(EC.visibility_of_element_located((By.XPATH, "//span[contains(@class,'_313x')]//following::span[1]"))).get_attribute("innerHTML"))
          file2.write("\nComments")
          for element in comments:
            file2.write('\n')
            file2.write(element)
  except:
          pass
  for items in personaldata:
    print(items.text)
  for items in posts:
    print(items.text) 

facebook(user)

