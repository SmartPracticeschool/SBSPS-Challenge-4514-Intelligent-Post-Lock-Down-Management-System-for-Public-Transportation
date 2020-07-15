import tweepy

consumer_key = "ypWAv9QvDwyuYoA03ysNFpwaL" 
consumer_secret = "3nsGriPliwAlNKXc0m7HYZ64ZUEXt4jVmaJaUxbqIeJhyPQotx"
access_key = "1328561335-bEeA5T5kDindRC2QhAQpwJSl11zVenDhQVXKqZX"
access_secret = "UYmfF64acAkglBuRkH4OZdJTGiz3oaSfc0kbUn6gN8zeW"
  

def get_tweets(username): 
          
        # Authorization to consumer key and consumer secret 
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret) 
  
        # Access to user's access key and access secret 
        auth.set_access_token(access_key, access_secret) 
  
        # Calling api 
        api = tweepy.API(auth) 
        userobj = api.get_user(username)
        print("User'Name :" +userobj.name)
        print(" Screen Name: "+userobj.screen_name)
        print(" User's Location: " +userobj.location)
        userobj.description = userobj.description.replace("\n", "");
        print(" User's Description: "+userobj.description)
        print(" Followers count:"+str(userobj.followers_count))
        print(" Friends Count:"+str(userobj.friends_count))  
        print("\n\n")

        # 200 tweets to be extracted 
        
        tweets = api.user_timeline(screen_name=username,count=100000) 
  
        # Empty Array     
        tmp=[]  
  
        # create array of tweet information: username,  
        # tweet id, date/time, text 
        tweets_for_csv = [tweet.text for tweet in tweets] # CSV file created  
        for j in tweets_for_csv: 
  
            # Appending tweets to the empty array tmp 
            tmp.append(j)  
  
        # Printing the tweets 
        print(tmp) 
        file2 = open(r"tweet.txt","w")
        file2.write("Name: "+userobj.name)
        file2.write("\nUsername: "+userobj.screen_name)
        file2.write("\nLocation: "+userobj.location)
        file2.write("\nDescription: "+userobj.description)
        file2.write("\nFollowers: "+str(userobj.followers_count))
        file2.write("\nFriends Count: "+str(userobj.friends_count))
        file2.write("\nTweets:")
        for element in tmp:
        	file2.write('\n')
        	file2.write(element)
        	
        file2.close()


  
  
def twitter(user) :
    get_tweets(user)
    hash_tag_list = ["covid,covid19,corona,vaccination,medicine"]
    fetched_tweets_filename = "tweets.txt"

    twitter_streamer = TwitterStreamer()
    twitter_streamer.stream_tweets(fetched_tweets_filename, hash_tag_list)


     
