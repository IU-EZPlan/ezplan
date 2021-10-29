import os
import time
from flask import Flask, request, send_from_directory 

from config import *
from processing.places import *
import display_data.hotels as hotels




app = Flask(__name__, static_folder="../build")
# app = Flask(__name__, static_folder='public')


@app.route("/")
def hello_world():
    return "<p>Flask app </p>"



@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/hotels', methods=['GET'])
def get_all_hotels():
    # Assume that all params are strings
    location = request.args.get("location")
    adults_number = request.args.get("adults")
    children_number = request.args.get("children")
    checkin_date = request.args.get("checkIN")
    checkout_date = request.args.get("checkOUT")
    room_number = request.args.get("rooms")

    if location:
        return hotels.get_hotels_by_location(location, adults_number, children_number, checkin_date, checkout_date, room_number)
    return hotels.get_all()






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
