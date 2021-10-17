import http.client
import json

# We are using the booking.com API for hotel data
conn = http.client.HTTPSConnection("booking-com.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "booking-com.p.rapidapi.com",
    'x-rapidapi-key': "eed4d51decmsh023551644726034p1210dcjsn04c1d5de3fcd"
}



def get_all():
    
    location = "Ohio"
    conn.request("GET", "/v1/hotels/locations?name="+location+"&locale=en-us", headers=headers)

    res = conn.getresponse()
    data = res.read()
    # Turn into String
    dataStr = data.decode()

    # Turn this string into an object (in python, this is a dictionary aka json)
    x = json.loads(dataStr)

    # Get the destID and destType from the dictionary with US as the country
    destID = ""
    destType = ""
    for d in x:
        if d['country'] == 'United States':
            destID = d["dest_id"]
            destType = d["dest_type"]
            break

    # Make the new request
    conn.request("GET", "/v1/hotels/search?locale=en-gb&room_number=1&checkout_date=2021-11-26&order_by=popularity&units=metric&adults_number=2&filter_by_currency=AED&checkin_date=2021-11-25&dest_type="+destType+"&dest_id="+destID+"&children_number=2&page_number=0&categories_filter_ids=facility%3A%3A107%2Cfree_cancellation%3A%3A1&children_ages=5%2C0", headers=headers)

    # # Hotel Data!
    res1 = conn.getresponse()
    data1 = res1.read()

    # Turn Into String
    dataStr1 = data1.decode()


    # Load the data and return it
    list_of_hotels = json.loads(dataStr1)

    return dataStr1




def get_hotels_by_location(state):
    conn.request("GET", "/v1/hotels/locations?name="+state+"&locale=en-us", headers=headers)
