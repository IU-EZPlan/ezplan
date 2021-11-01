import http.client
import json
import os

conn = http.client.HTTPSConnection("app.ticketmaster.com")
# Function to return the events JSON
def getJSONObj(latlong, includeKids, startDate, endDate, page):
    conn.request("GET", "/discovery/v2/events.json?latlong="+latlong+"&includeFamily="+includeKids+"&radius=50&unit=miles&locale=*&page="+str(page)+"&startDateTime="+startDate+"T00:00:00Z&endDateTime="+endDate+"T00:00:00Z&apikey=F8RzQmU95ElJtH7FzQRVr55vsJstaADA")
    res = conn.getresponse()
    data = res.read()
    dataStr = data.decode()
    x = json.loads(dataStr)
    return x

# Setting parameters for search
def getEvents(lalon, start, end, kids):
    x = getJSONObj(lalon, kids, start, end, 0)

    # We can only have a max of 5 API Calls per second, so doing this will ensure that we get as many calls as possible 
    maxPages = int(x["page"]["totalPages"])
    if(maxPages > 3):
        maxPages = 3

    # creating a dictionary of our relevant information for each event
    eventDict = {}
    eventList = []
    for y in range(0, maxPages):
        x = getJSONObj(lalon, kids, start, end, y)
        events = x['_embedded']['events']
        for i in events:
            print(i["name"])
            eventDict[i["id"]] = {}
            tmp = {}
            if "name" in i.keys():
                eventDict[i["id"]]["name"] = i["name"]
                tmp["name"] = i["name"]
                
            if "url" in i.keys():
                eventDict[i["id"]]["url"] = i["url"]
                tmp["url"] = i["url"]


            if "images" in i.keys():
                eventDict[i["id"]]["image"] =  i["images"][0]["url"] 
                tmp["image"] =  i["images"][0]["url"] 
            
            if "dates" in i.keys():
                if "start" in i["dates"].keys():
                    if "localTime" in i["dates"]["start"].keys():
                        eventDict[i["id"]]["time"] = i["dates"]["start"]["localTime"]
                        tmp["time"] = i["dates"]["start"]["localTime"]

                    if "localDate" in i["dates"]["start"].keys():
                        eventDict[i["id"]]["date"] = i["dates"]["start"]["localDate"]
                        tmp["date"] = i["dates"]["start"]["localDate"]

            if "info" in i.keys():
                eventDict[i["id"]]["info"] = i["info"]
                tmp["info"] = i["info"]

            eventList += [tmp]
    
    # Create and return JSON object
    # print(eventDict, type(eventDict))
    # jobj = json.loads(eventDict)
    # print(jobj, type(jobj))
    # return jobj
    return {"data": eventList}


# dataStr = getEvents("39,-86", "2021-10-21", "2021-11-11", "yes")
# x = json.loads(dataStr)
# for i in x:
#      print(x[i]["name"])
