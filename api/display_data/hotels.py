import http.client

# We are using the booking.com API for hotel data
conn = http.client.HTTPSConnection("booking-com.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "booking-com.p.rapidapi.com",
    'x-rapidapi-key': "eed4d51decmsh023551644726034p1210dcjsn04c1d5de3fcd"
}



def get_all():

    location = "Ohio"
    conn.request("GET", "/v1/hotels/locations?name="+location+"&locale=en-us", headers=headers)

    return "all hotels"
