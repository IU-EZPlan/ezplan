import time
from flask import Flask #,redirect, send_from_directory, request
from config import *
from processing import *

# More files to help 
import display_data.hotels as hotels

# THIS IS THROWING AN ERROR 
#   from processing.places import Places


app = Flask(__name__)
# app = Flask(__name__, static_folder='public')


@app.route("/")
def hello_world():
    # send_from_dir is throwing an error, cannot import properly
    # return send_from_directory(PUBLIC_DIR, 'index.html')
    return "<p>Flask app </p>"


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/hotels')
def get_all_hotels():
    return hotels.get_all()
    # return {"testing": "testing hotels api"}



# @app.route("/call1")
# def fn():
#     json = request.json()
#     print(json)
#     Places.getPlaces(json)




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
