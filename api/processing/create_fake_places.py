import sys
sys.path.insert(0, "D:\IUB\SE\Project\ezplan\firebase_connection\firebase_fake_places")
import FirebaseFakePlaces

firebase_fake_places = firebase_fake_places.FirebaseFakePlaces()

while input("Enter places").lower() == "\n":
    city = input("Enter City: ").lower()
    state = input("State: ").lower()
    country = input("Country: ").lower()

    firebase_fake_places.fake_places(city, state, country)

while True:
    place = input("Enter city and state: ").lower().replace(" ", "")
    if place == "stop":
        break
    
    parks = []
    while True:
        park = input("Enter park name and duration: ")
        if park == "stop":
            break
        else:
            park.split(" ")
            parks.append(park)

    restaurants = []
    while True:
        restaurant = input("Enter park name and duration: ")
        if restaurant == "stop":
            break
        else:
            restaurant.split(" ")
            restaurants.append(restaurant)

    pubs = []
    while True:
        pub = input("Enter pub and duration: ")
        if pub == "stop":
            break
        else:
            pub.split(" ")
            pubs.append(pubs)

    museums = []
    while True:
        museum = input("Enter museum and duration: ")
        if museum == "stop":
            break
        else:
            museum.split(" ")
            museums.append(museum)


    hotels = []
    while True:
        hotel = input("Enter hotel name, cost per night and review of the hotel: ")
        if hotel == 'stop':
            break
        else:
            hotel.split(" ")
            hotels.append(hotel)

    firebase_fake_places.fake_cities(place, parks, restaurants, pubs, museums, hotels)





    



