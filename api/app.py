import time
from flask import Flask, request 
from config import *
from processing.places import *

# More files to help 
import display_data.hotels as hotels

import os
from dotenv import load_dotenv

load_dotenv()
DOMAIN_HOST = os.getenv("HOST")


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Flask app </p>"


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
