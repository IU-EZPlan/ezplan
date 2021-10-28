import time
from flask import Flask, request, send_from_directory 
from api.config import *
from api.processing.places import *
import os

# More files to help 
import api.display_data.hotels as hotels

import os
from dotenv import load_dotenv

load_dotenv()
DOMAIN_HOST = os.getenv("HOST")


app = Flask(__name__, static_folder="../build")
# app = Flask(__name__, static_folder='public')

@app.route('/', defaults={'path': ''})
@app.route("/")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/hotels', methods=['GET'])
def get_all_hotels():
    location = request.args.get("location")

    if location:
        return hotels.get_hotels_by_location(location)
    return hotels.get_all()



# @app.route("/call1")
# def fn():
#     json = request.json()
#     print(json)
#     Places.getPlaces(json)




if __name__ == '__main__':
    app.run(host=DOMAIN_HOST, port=5000)
