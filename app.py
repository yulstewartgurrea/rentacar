from flask import Flask, request, jsonify
import json, os, sys
import flask
from config import *

app = Flask(__name__)

@app.route('/')
def hellow_world():
    return "hellow world!"

@app.route("/admin/<string:email>", methods=['POST'])
def new_admin(email):
	jsn = json.loads(request.data)

	res = spcall("new_admin", (
		jsn['email'],
		jsn['password']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'Error', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/customer/<string:email>", methods=['POST'])
def new_customer(email):
    jsn = json.loads(request.data)

    res = spcall("new_customer",(
        jsn['email'],
        jsn['password']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})

@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers',
                                                                             'Authorization')
    # set low for debugging

    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp


if __name__ == '__main__':
    app.secret_key = 'B1Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    # app.run(host='localhost', debug=True)
    app.run(host='0.0.0.0', debug=True)