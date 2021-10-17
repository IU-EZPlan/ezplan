from pyrebase import pyrebase

firebaseConfig = {
  'apiKey': "AIzaSyBLzGhvBRa7E2BiJr6N_3gCdb-t2bkHVF4",
  'authDomain': "tour-management-93804.firebaseapp.com",
  'databaseURL': "https://tour-management-93804-default-rtdb.firebaseio.com",
  'projectId': "tour-management-93804",
  'storageBucket': "tour-management-93804.appspot.com",
  'messagingSenderId': "197250917552",
  'appId': "1:197250917552:web:8e5d09d2bd09f6f2bc0775"
}

class FirebaseInitialize():
    def __init__(self) -> None:
        firebase = pyrebase.initialize_app(firebaseConfig)
        self.db = firebase.database()
        self.auth = firebase.auth()
        self.storage = firebase.storage()

