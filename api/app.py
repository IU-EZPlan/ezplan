import time
from flask import Flask, request, send_from_directory 
from config import *
from processing.places import *
import os

# More files to help 
import display_data.hotels as hotels

# THIS IS THROWING AN ERROR 
#   from processing.places import Places


app = Flask(__name__, static_folder="../build")
# app = Flask(__name__, static_folder='public')


@app.route("/")
def hello_world():
    return "<p>Flask app </p>"

# def serve(path):
#     if path != "" and os.path.exists(app.static_folder + '/' + path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')



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



# @app.route("/call1")
# def fn():
#     json = request.json()
#     print(json)
#     Places.getPlaces(json)




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
