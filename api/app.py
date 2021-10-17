import time
from flask import Flask, request #,redirect, send_from_directory, request
from config import *
from processing.places import *

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


@app.route("/call1")
def fn():
    json = {'test': 'test'}
    # print(json)
    placesObject = Places()
    placesObject.getPlaces(json)
    print("HERE \n")




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
