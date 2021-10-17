import http.client
import json


conn = http.client.HTTPSConnection("booking-com.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "booking-com.p.rapidapi.com",
    'x-rapidapi-key': "0abe195911msh530834c67485896p1a77cajsn860dc0c5ac8e"
}

location = "Ohio"
conn.request("GET", "/v1/hotels/locations?name="+location+"&locale=en-us", headers=headers)

res = conn.getresponse()
data = res.read()
# Turn into String
dataStr = data.decode()

# Turn this string into an object (in python, this is a dictionary aka json)
x = json.loads(dataStr)
print(type(x), x, "\n\n")
for i in x:
    print(i, "\n\n")

# Get the destID and destType from the dictionary with US as the country
destID = ""
destType = ""
for d in x:
    if d['country'] == 'United States':
        destID = d["dest_id"]
        destType = d["dest_type"]
        break

print(destType, destID)
conn.request("GET", "/v1/hotels/search?locale=en-gb&room_number=1&checkout_date=2021-11-26&order_by=popularity&units=metric&adults_number=2&filter_by_currency=AED&checkin_date=2021-11-25&dest_type="+destType+"&dest_id="+destID+"&children_number=2&page_number=0&categories_filter_ids=facility%3A%3A107%2Cfree_cancellation%3A%3A1&children_ages=5%2C0", headers=headers)

# # Hotel Data!
res1 = conn.getresponse()
data1 = res1.read()

# Turn Into String
dataStr1 = data1.decode()

print(type(dataStr1))

# Load the data and return it
list_of_hotels = json.loads(dataStr1)
print(dataStr1)


