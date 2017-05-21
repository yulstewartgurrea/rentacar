from flask import Flask, request, jsonify, session, abort, escape, app
import json, os, sys
import flask
from config import *
from flask_session import Session
# from redissession import RedisSessionInterface
from flask_multisession import RedisSessionInterface
from redis import Redis
# from decorator import *
# from that_queue_module import queue_daemon


app = Flask(__name__)
app.config['SECRET_KEY'] = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
# app.session_interface = RedisSessionInterface()
# app.config['REDIS_QUEUE_KEY'] = 'my_queue'
# queue_daemon(app)

redis = Redis()

@app.route('/')
def hello_world():
    return "hello world!"

# Login
@app.route('/login', methods=['GET' ,'POST'])
def login():
    jsn = json.loads(request.data)

    res = spcall('login', (
        jsn['email'],
        jsn['password'],), True)

    rescategory = spcall('get_category', ())

    resbrand = spcall('get_brand', ())

    if 'Error' in str(rescategory[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})
    
    if 'Error' in str(resbrand[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recscategory = []
    for r in rescategory:
        recscategory.append({'category_name': str(r[0])})

    recsbrand = []
    for r in resbrand:
        recsbrand.append({'brandname': str(r[0])})

    if len(res) == 0:
        return jsonify({'status': 'Invalid credentials'})

    if 'Invalid credentials' in str(res[0][0]):
        return jsonify({'status': 'Invalid credentials', 'message': res[0][0]})

    if 'Login successful' in str(res[0][0]):
        session['logged_in'] = True
        session['email'] = jsn['email']
        user = get_userbyemail(session['email'])
        session['email'] = jsn['email']
        session['user_id'] = user[0][1]
        session['first_name'] = user[0][2]
        session['last_name'] = user[0][3]
        session['address1'] = user[0][4]
        session['address2'] = user[0][5]
        session['mobile_no'] = str(user[0][6])
        session['is_admin'] = user[0][7]
        session['is_customer'] = user[0][8]

        print res[0][0]
        print ('email:' +session['email'])
        recsuser = []
        for r in user:
            recsuser.append({'email': session['email'], 'user_id': session['user_id'], 'first_name': session['first_name'], 'last_name': session['last_name'],
                            'address1': session['address1'], 'address2': session['address2'], 'mobile_no': session['mobile_no'],
                            'is_admin': session['is_admin'], 'is_customer': session['is_customer']})

        print recsuser

        return jsonify({'status': 'Login successful', 'message': res[0][0], 'categories': recscategory, 'countcategories': len(recscategory),
                'userinfo': recsuser, 'countuserinfo': len(recsuser), 'brands': recsbrand, 'countbrands': len(recsbrand)})
    # else:
    #     session['logged_in'] = False
    #     return jsonify({'status': 'Invalid credentials'})

def get_userbyemail(email):
    return spcall("get_userbyemail", (email,))

# Logout
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

	if 'Error' in str(res[0][0]):
		return jsonify({'status': 'Error', 'message': res[0][0]})

	return jsonify({'status': 'Ok', 'message': res[0][0]})

# Add new customer
@app.route('/register', methods=['POST'])
def new_customer():
    jsn = json.loads(request.data)

    res = spcall('new_customer', (
        jsn['email'],
        jsn['password']), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})

# Get customers
@app.route('/customers', methods=['GET'])
def get_customers():
    res = spcall('get_customers', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'user_id': r[0], 'first_name': str(r[1]), 'last_name': str(r[2]), 'address1': str(r[3]),
                    'address2': str(r[4]), 'mobile_no': str(r[5]), 'email': str(r[6]), 'password': str(r[7]),
                    'is_admin': str(r[8]), 'is_customer': str(r[9])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

# Get account by user id
@app.route('/account/<string:user_id>', methods=['GET'])
def useraccount(user_id):
    res = spcall('get_userprofile', (user_id,), )

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'user_id': str(r[0]), 'first_name': str(r[1]), 'last_name': str(r[2]), 'address1': str(r[3]),
            'address2': str(r[4]), 'mobile_no': str(r[5]), 'email': str(r[6])})

    print recs

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)}) 

# Update useraccount
@app.route('/account/update/<string:user_id>', methods=['PUT'])
def update_useraccount(user_id):
    jsn = json.loads(request.data)

    user_id = jsn.get('user_id', '')
    first_name = jsn.get('first_name', '')
    last_name = jsn.get('last_name', '')
    address1 = jsn.get('address1', '')
    address2 = jsn.get('address2', '')
    mobile_no = jsn.get('mobile_no', '')
    email = jsn.get('email', '')

    print (jsn)

    res = spcall('update_useraccount', (
        user_id,
        first_name,
        last_name,
        address1,
        address2,
        mobile_no,
        email), True)

    print res
    
    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})
    else:
        return jsonify({'status': 'Ok'})

#Add new owner of car
@app.route('/owner/<string:owner_first_name>/<string:owner_last_name>', methods=['POST'])
def new_owner(owner_first_name, owner_last_name):
    jsn = json.loads(request.data)

    res = spcall('new_owner', (
        jsn['owner_first_name'],
        jsn['owner_last_name'],
        jsn['owner_address1'],
        jsn['owner_address2'],
        jsn['owner_mobile_no'],), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})

# Update Car Owner
@app.route('/owner/update/<owner_id>', methods=['PUT'])
def update_carowner(owner_id):
    jsn = json.loads(request.data)

    owner_id = jsn.get('owner_id', '')
    owner_first_name = jsn.get('owner_first_name', '')
    owner_last_name = jsn.get('owner_last_name', '')
    owner_address1 = jsn.get('owner_address1', '')
    owner_address2 = jsn.get('owner_address2', '')
    owner_mobile_no = jsn.get('owner_mobile_no', '')

    print (jsn)

    res = spcall('update_carowner', (
        owner_id,
        owner_first_name,
        owner_last_name,
        owner_address1,
        owner_address2,
        owner_mobile_no), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})
    else:
        return jsonify({'status': 'Ok'})

# Get car owners
@app.route('/owners', methods=['GET'])
def get_carowners():
    res = spcall('get_carowners', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'owner_id': str(r[0]), 'owner_firstname': str(r[1]), 'owner_lastname': str(r[2]),
                    'owner_address1': str(r[3]), 'owner_address2': str(r[4]), 'owner_mobile_no': str(r[5])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

# Get car owner by id
@app.route('/owner/<string:owner_id>', methods=['GET'])
def get_carownerbyid(owner_id):
    res = spcall('get_carownerbyid', (owner_id,), )

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'owner_id': str(r[0]), 'owner_firstname': str(r[1]), 'owner_lastname': str(r[2]), 'owner_address1': str(r[3]),
            'owner_address2': str(r[4]), 'owner_mobile_no': str(r[5])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

# Get all categories
@app.route('/category', methods=['GET'])
def get_categories():
    res = spcall('get_category', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'category_name': str(r[0])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

# Get all brands
@app.route('/brand', methods=['GET'])
def get_brands():
    res = spcall('get_brand', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'brand_name': str(r[0])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

# Add new car
@app.route('/car/<string:car_plate_number>/<string:car_brandname>/<string:car_model>/<string:car_color>', methods=['POST'])
def new_car(car_plate_number, car_color, car_brandname, car_model):
    jsn = json.loads(request.data)

    res = spcall('new_car', (
        jsn['car_plate_number'],
        jsn['car_color'],
        jsn['car_brandname'],
        jsn['car_model'],
        jsn['car_rental_rate'],
        jsn['car_image'],
        jsn['car_owner_id']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})

# Update car
@app.route('/car/update/<string:car_plate_number>', methods=['PUT'])
def update_car(car_plate_number):
    jsn = json.loads(request.data)

    car_plate_number = jsn.get('car_plate_number', '')
    car_color = jsn.get('car_color', '')
    car_model = jsn.get('car_model', '')
    car_rental_rate = jsn.get('car_rental_rate', '')
    car_image = jsn.get('car_image', '')
    car_category_name = jsn.get('car_category_name', '')
    car_owner_id = jsn.get('car_owner_id', '')
    car_brandname = jsn.get('car_brandname', '')

    print (jsn)

    res = spcall('update_car', (
        car_plate_number,
        car_color,
        car_brandname,
        car_model,
        car_rental_rate,
        car_image,
        car_owner_id,
        car_category_name,), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})
    else:
        return jsonify({'status': 'Ok'})

# Get all cars
@app.route('/cars', methods=['GET'])
def get_cars():

    email = session.get('email')
    user_id = session.get('user_id')
    first_name = session.get('first_name')
    last_name = session.get('last_name')

    print ("email:" + str(email))

    res = spcall('get_cars', ())

    rescategory = spcall('get_category', ())

    resbrand = spcall('get_brand', ())

    rescategorybrand = spcall('get_categorybrand', ())

    # user = spcall('get_userbyemail', (email,))

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    if 'Error' in str(rescategory[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    if 'Error' in str(resbrand[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    if 'Error' in str(rescategorybrand):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recsuser = []
    recsuser.append({'email': email ,'user_id':user_id, 'first_name': first_name, 'last_name': last_name})

    recs = []
    for r in res:
        recs.append({'car_plate_number': str(r[0]), 'car_color': str(r[1]), 'car_brandname': str(r[2]), 'car_model': r[3],
            'car_rental_rate': str(r[4]), 'car_image': str(r[5]), 'car_owner_id': r[6], 'car_category_name': str(r[7])})

    recscategory = []
    for r in rescategory:
        recscategory.append({'category_name': str(r[0])})

    recsbrand = []
    for r in resbrand:
        recsbrand.append({'brandname': str(r[0])})

    # session['category_name'] = rescategory(jsn['category_name'])
    recscategorybrand = []
    for r in rescategorybrand:
        # recscategorybrand.append({'category_name': session['category_name'], 'brandname': str(r[1])})
        recscategorybrand.append({'category_name': str(r[0]), 'brandname': str(r[1])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs), 'categories': recscategory,
                'countcategories': len(recscategory), 'brands': recsbrand, 'countbrands': len(recsbrand),
                'categorybrand': recscategorybrand, 'countcategorybrand': len(recscategorybrand),
                'recsuser': recsuser, 'recsusercount': len(recsuser)})

# Get car by plate number
@app.route('/car/platenumber/<string:car_plate_number>', methods=['GET'])
def get_carbyplatenumber(car_plate_number):
    res = spcall('get_carbyplatenumber', (car_plate_number,), )

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'car_plate_number': str(r[0]), 'car_color': str(r[1]), 'car_brandname': str(r[2]), 'car_model': str(r[3]), 'car_rental_rate': str(r[4]),
            'car_image': str(r[5]), 'car_owner_id': r[6], 'car_category_name': str(r[7])})

    email = session.get('email')
    user_id = session.get('user_id')
    first_name = session.get('first_name')
    last_name = session.get('last_name')


    recsuser = []
    recsuser.append({'email': email ,'user_id':user_id, 'first_name': first_name, 'last_name': last_name})
    
    # print log.userinfo
    print recsuser        

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs), 'recsuser':recsuser, 'recsusercount': len(recsuser)})


# Get car by category name
@app.route('/car/category/<string:car_category_name>', methods=['GET'])
def get_carbycategory(car_category_name):
    res = spcall('get_carbycategory', (car_category_name,), )

    rescategory = spcall('get_category', ())

    resbrand = spcall('get_brand', ())

    if 'Error' in str(res):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    if 'Error' in str(rescategory[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    if 'Error' in str(resbrand[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})


    recs = []
    for r in res:
        recs.append({'car_category_name': str(r[0]), 'car_plate_number': str(r[1]),'car_color': str(r[2]), 'car_brandname': str(r[3]), 'car_model': str(r[4]), 
            'car_rental_rate': str(r[5]), 'car_image': str(r[6]), 'car_owner_id': r[7]})

    recscategory = []
    for r in rescategory:
        recscategory.append({'category_name': str(r[0])})

    recsbrand = []
    for r in resbrand:
        recsbrand.append({'brandname': str(r[0])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs), 'brands': recsbrand, 'countbrands': len(recsbrand),
                    'categories': recscategory, 'countcategories': len(recscategory)})

# Get car by brandname
@app.route('/car/brand/<string:car_brandname>', methods=['GET'])
def get_carbybrandname(car_brandname):
    res = spcall('get_carbybrandname', (car_brandname,), )

    if 'Error' in str(res):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'car_plate_number': str(r[0]), 'car_color': str(r[1]), 'car_model': str(r[2]), 'car_rental_rate': str(r[3]),
            'car_image': str(r[4]), 'car_owner_id': r[5], 'car_category_name': str(r[6])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})    

# Get car by category and brandname
@app.route('/car/category/<string:car_category_name>/brand/<string:car_brandname>', methods=['GET'])
def get_carbycategorybrandname(car_category_name, car_brandname):
    res = spcall('get_carbycategorybrandname', (car_category_name, car_brandname,), )

    if 'Error' in str(res):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'car_category_name': str(r[0]) ,'car_plate_number': str(r[1]), 'car_color': str(r[2]), 'car_model': str(r[3]),
                    'car_rental_rate': str(r[4]), 'car_image': str(r[5]), 'car_owner_id': r[6]})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

@app.route('/cart', methods=['POST'])
def addtocart():
    jsn = json.loads(request.data)    

    res = spcall('cart_addproduct', (
                jsn['cart_plate_number'],
                jsn['cart_user_id']), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    if 'Ok' in str(res[0][0]):
        user = get_userbyemail(jsn['email'])
        session['user_id'] = user[0][0]
        session['cart_plate_number'] = [0][0]
        sessionn['cart_user_id'] = [0][1]

        session['cart'] = []
        for r in res:
            session['cart'].append({'cart_plate_number': str(r[0]), 'cart_user_id': str(r[1])})

    # return jsonify({'status': 'Ok', 'message': res[0][0], 'user_id': session['user_id']})
    return jsonify({'status': 'Ok', 'message': res[0][0], 'entries': session['cart']})

@app.route('/cart/<string:cart_user_id>/<string:cart_id>', methods=['GET'])
def cart(cart_id, cart_user_id):
    res = spcall('get_cartbyuser', (cart_id ,cart_user_id), )

    if 'Error' in str(res):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'car_plate_number': str(r[0]), 'car_category_name': str(r[1]), 'car_brandname': str(r[2]), 'car_model': str(r[3]),
            'car_color': str(r[4]), 'car_rental_rate': str(r[5]), 'car_image': str(r[6]), 'cart_user_id': str(r[7]),
            'cart_id': str(r[8])})

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
    # app.session_interface = RedisSessionInterface()
    app.run(host='0.0.0.0', debug=True)