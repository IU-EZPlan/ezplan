from .firebase_intialize import FirebaseInitialize

class FirebaseFakePlaces(FirebaseInitialize):
    def __init__(self) -> None:
        super().__init__()

    def fake_places(self, city, state, country):
        try:
            data = {
                'city': city,
                'state': state,
                'country': country
            }

            self.db.child("places").child(city + state).set(data)
            return True

        except Exception as e:
            return {'exception': e}

    def fake_cities(self, place, parks, restaurants, pubs, museums, hotels):
        try:
            for park in parks:
                data = {
                    'park': park[0], # park name
                    'time': park[1] # Time it will take to visit the park
                }

                self.db.child("places").child(place).child("parks").push(data)

            for restaurant in restaurants:
                data = {
                    'restaurant': restaurant[0], # restaurant name
                    'time': restaurant[1] # time it will take
                }

                self.db.child("places").child(place).child("restaurants").push(data)

            for pub in pubs:
                data = {
                    'pub': pub[0], # name
                    'time': pub[1] # time it'll take
                }

                self.db.child("places").child(place).child("pubs").push(data)

            for museum in museums:
                data = {
                    'museum': museum[0], # name
                    'time': museum[1] # time
                }

                self.db.child("places").child(place).child("museums").push(data)

            for hotel in hotels:
                data = {
                    'hotel': hotel[0], # name
                    'price': hotel[1], # cost per night
                    'review': hotel[2] # no. of stars the hotel has gotten
                }

                self.db.child("places").child(place).child("hotels").push(data)

            return True

        except Exception as e:
            return {'exception': e}
