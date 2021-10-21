# from ..firebase_connection import Firebase_Users

class User():
    def __init__(self) -> None:
        self.first_name = None
        self.last_name = None
        self.email = None
        self.password = None

    def create_user(self, user_credentials):
        try:
            fbase_users = Firebase_Users()

            self.first_name = user_credentials['first_name']
            self.last_name = user_credentials['last_name']
            self.email = user_credentials['email']
            self.password = user_credentials['password']

            return fbase_users.create_user(self.first_name, self.last_name, self.email, self.password)

        except Exception as e:
            return {'exception': e}

    



