from firebase import firebase_places

class Places():
    def __init__(self) -> None:
        self.city = None
        self.state = None
        self.country = None
        self.firebase_places = firebase_places.FirebasePlaces()

    # Autocomplete and Search - Requirement 1.a
    def getPlaces(self, data):
        try:
            # If place is an empty string, return all the places
            if data['place'] == "":
                return self.firebase_places.getAllPlaces(data['place'])
                pass
            
            # Else return only the places that match the string
            else:
                return self.firebase_places.getMatchingPlaces(data['place'])

        except Exception as e:
            return e

    # Place info - requirement 1.b
    def getPlacesInfo(self, data):
        try:
            return self.firebase_places.getPlacesInfo(data['place'])

            # This does not include pictures.
            # I'm not sure how we should retreive pictures from storage section of firebase, 
            # combine it in the above json and send it to the front-end
            # One possible way would be to upload it, generate its URL, store it in the places and then retreive it and send it along
            # with other info.

        except Exception as e:
            raise e

    
