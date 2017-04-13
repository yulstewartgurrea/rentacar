from flask import Flask, request, jsonify, session
import json, os, sys
import flask
from config import *

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "hello world!"

# Login
@app.route('/login', methods=['POST'])
def login():
    jsn = json.loads(request.data)

    res = spcall('login', (
        jsn['email'],
        jsn['password'],), True)

    if len(res) == 0:
        return jsonify({'status': 'Invalid credentials'})

    if 'Invalid credentials' in str(res):
        return jsonify({'status': 'Invalid credentials', 'message': res[0][0]})

    if 'Login successful' in str(res):
        session['logged_in'] == True
        user = get_userbyemail(jsn['email'])
        session['first_name'] = user[0][0]
        session['last_name'] = user[0][1]
        session['address1'] = user[0][2]
        session['address2'] = user[0][3]
        session['mobile_no'] = user[0][4]
        session['is_admin'] = user[0][5]
        session['is_customer'] = user[0][6]
        return jsonify({'status': 'Login successful'})
    else:
        return jsonify({'status': 'Invalid credentials'})

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.clear()
    return jsonify({'message': 'Successfuly logged out'})

# Add new Admin
@app.route('/admin/<string:email>', methods=['POST'])
def new_admin(email):
	jsn = json.loads(request.data)

	res = spcall('new_admin', (
		jsn['email'],
		jsn['password']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'Error', 'message': res[0][0]})

	return jsonify({'status': 'Ok', 'message': res[0][0]})

# Add new customer
@app.route('/customer/<string:email>', methods=['POST'])
def new_customer(email):
    jsn = json.loads(request.data)

    res = spcall('new_customer', (
        jsn['email'],
        jsn['password']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})

#Add new owner of car
@app.route('/owner/<string:first_name>/<string:last_name>', methods=['POST'])
def new_owner(first_name, last_name):
    jsn = json.loads(request.data)

    res = spcall('new_owner', (
        jsn['first_name'],
        jsn['last_name'],
        jsn['address1'],
        jsn['address2'],
        jsn['mobile_no']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})

@app.route('/car/<string:plate_number>/<string:color>/<string:brand_name>/<string:model>/<string:rental_rate>', methods=['POST'])
def new_car(plate_number, color, brand_name, model, rental_rate):
    jsn = json.loads(request.data)

    res = spcall('new_car', (
        jsn['plate_number'],
        jsn['color'],
        jsn['brand_name'],
        jsn['model'],
        jsn['rental_rate'],
        jsn['image'],
        jsn['owner_id']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})

@app.route('/cars', methods=['GET'])
def get_cars():
    res = spcall('get_cars', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'plate_number': str(r[0]), 'color': str(r[1]), 'brand_name': str(r[2]), 'model': r[3],
            'rental_rate': str(r[4]), 'image': str(r[5]), 'owner_id': r[6]})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

@app.route('/car/<plate_number>', methods=['GET'])
def get_carbyid(plate_number):
    res = spcall('get_carbyid', (plate_number,),)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': str[0][0]})

    recs = []
    for r in res:
        recs.append({'color': str(r[0]), 'brand_name': str(r[1]), 'model': str(r[2]), 'rental_rate': str(r[3]),
            'image': str(r[4]), 'price': str(r[5])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})
    

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