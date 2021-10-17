import http.client

conn = http.client.HTTPSConnection("booking-com.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "",
    'x-rapidapi-key': ""
}


location = "Ohio"
conn.request("GET", "/v1/hotels/locations?name="+location+"&locale=en-us", headers=headers)

res = conn.getresponse()
data = res.read()
# Turn into String
dataStr = data.decode()
# Split into array that contains each location that appears 
dataStrSplit = dataStr.split('},{')
# Get first location result
dataObj = dataStrSplit[0]
# Split that into it's corresponding data
dataObjSplit = dataObj.split(',')
destID = ""
destType = ""
# Filter for data that is necessary to search for hotels 
for i in dataObjSplit:
    if("dest_id" in i):
        destID = i
    elif("dest_type" in i):
        destType = i
# Clean that data to insert and find hotels
destID = destID[11:]
destID = destID[:len(destID)-1]
destType = destType[13:]
destType = destType[:len(destType)-1]
conn.request("GET", "/v1/hotels/search?locale=en-gb&room_number=1&checkout_date=2021-11-26&order_by=popularity&units=metric&adults_number=2&filter_by_currency=AED&checkin_date=2021-11-25&dest_type="+destType+"&dest_id="+destID+"&children_number=2&page_number=0&categories_filter_ids=facility%3A%3A107%2Cfree_cancellation%3A%3A1&children_ages=5%2C0", headers=headers)
# Hotel Data!
res1 = conn.getresponse()
data1 = res1.read()
# Turn Into String
dataStr1 = data1.decode()
# Split into array that contains each hotel that appears 
dataStrSplit1 = dataStr1.split('"result":')[1]
dataStrSplit2 = dataStrSplit1.split('},{')
# Get hotel results
print(dataStrSplit2[0])


