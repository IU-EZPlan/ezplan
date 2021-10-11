from .firebase_intialize import FirebaseInitialize

class FirebasePlaces(FirebaseInitialize):
    def __init__(self) -> None:
        super().__init__()
    
    # To get all places
    def getAllPlaces(self):
        # Write get query
        try:
            return self.db.child("places").get().val()

        except Exception as e:
            raise e


    # To get specific place that match the input string
    def getMatchingPlaces(self, placeString):
        try:
            return self.db.child("places").startAt(placeString).endAt(placeString + '\uf8ff').get().val()

        except Exception as e:
            raise e

    # To get info of the place
    def getPlacesInfo(self, place):
        try:
            return self.db.child("places").child(place).get().val()
            
        except Exception as e:
            raise e

