import http.client
import json
import os

# We are using the booking.com API for hotel data
conn = http.client.HTTPSConnection("booking-com.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "booking-com.p.rapidapi.com",
    'x-rapidapi-key': "0abe195911msh530834c67485896p1a77cajsn860dc0c5ac8e"
}

# Takes original currency code (EUR, USD....) and the new currency code returns the exchange rate (str, str, str)
def get_rate(original, toConvert, amount):
    print(original, toConvert, amount)
    if original != toConvert:
        conn.request("GET", "/v1/metadata/exchange-rates?currency="+original+"&locale=en-gb", headers=headers)

        res = conn.getresponse()
        data = res.read()

        # Turn into String
        dataStr = data.decode()

        # Turn this string into an object (in python, this is a dictionary aka json)
        x = json.loads(dataStr)
        rate = 0
        for obj in x['exchange_rates']:
            if toConvert == obj['currency']:
                rate = float(obj["exchange_rate_buy"])
                break
        return convert(amount, rate)
    else:
        return amount

# returns a string representing the conversion from the given amount to the desired currency, accurate enough probably.....
def convert(amount, rate):
    amount = amount.replace(",", "")
    amount = float(amount) * rate
    amount = round(amount, 2)
    print(amount)
    return {"amount" : '{:0.2f}'.format(amount)}

