from .firebase_intialize import FirebaseInitialize

class Firebase_Users(FirebaseInitialize):
    def __init__(self) -> None:
        super().__init__()

    def create_user(self, first_name, last_name, email, password):
        try:
            data = {
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password
            }

            self.db.child("users").push(data)
            return True

        except Exception as e:
            return {'exception': e}
