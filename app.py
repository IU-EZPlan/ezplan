from flask import Flask, redirect, send_from_directory

app = Flask(__name__, static_folder='public')

@app.route("/")
def hello_world():
    # return send_from_directory(app.static_folder, 'index.html')
    return "<p>Flask app </p>"



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
