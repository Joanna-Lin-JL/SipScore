import json
from flask import Flask, request
import users_dao
import datetime
from db import *
import json 
from db import Drink 
from db import User 

# define db filename
db_filename = "sipscore.db"
app = Flask(__name__)

# setup config
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_filename}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

# initialize app
db.init_app(app)
with app.app_context():
    db.create_all()

# generalized response formats
def success_response(data, code=200):
    return json.dumps({"success": True, "data": data}), code

def failure_response(message, code=404):
    return json.dumps({"success": False, "error": message}), code

def extract_token(request):
    """
    Helper function to extract token from header of request
    """
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        return False, failure_response("Missing authorization header.", 400)

    # Header looks like "Authorization: Bearer <Token>"
    bearer_token = auth_header.replace("Bearer ", "").strip()
    if bearer_token is None or not bearer_token:
        return False, (failure_response("Invalid authorization header", 400))

    return True, bearer_token

@app.route("/api/", methods=["GET"])
def greeting(): 
    return success_response("Welcome")

@app.route("/api/users/", methods=["GET"])
def get_users():
  return success_response({"users": [c.serialize() for c in User.query.all()]})

@app.route("/api/User/<int:userID>/", methods=["GET"])
def get_user(userID):
    user = User.query.get(userID)

    if user:
        return success_response(user.serialize())
    else:
        return failure_response("User not found")

@app.route("/api/drinks/", methods=["GET"])
def get_drinks():
  return success_response({"drinks": [c.serialize() for c in Drink.query.all()]})

@app.route("/api/drinks/<int:drinkID>/", methods=["DELETE"])
def delete_drink(drinkID):
    """
    Endpoint for deleting a drink by id
    """
    drink = Drink.query.filter_by(drinkID=drinkID).first()
    if drink is None:
        return failure_response("Drink not found")
    db.session.delete(drink)
    db.session.commit()
    return success_response(drink.serialize())

@app.route("/api/createdrink/", methods=["POST"])
def create_drink():
    """
    Endpoint for creating a new drink
    """
    body = json.loads(request.data)
    
    name = body.get("name")
    if name is None:
        return failure_response("Name not provided", 400)
    serving_size = body.get("serving_size")
    if serving_size is None:
      return failure_response("Serving size not provided", 400)
    location = body.get("location")
    seasonal = body.get("seasonal")
    if seasonal is None:
        seasonal = False # default
    caffeine_amt = body.get("caffeine_amt")
    if caffeine_amt is None: 
        return failure_response("Caffeine amt not provided", 400)
    drink_picture = body.get("drink_picture")
    new_drink = Drink(name=name, serving_size=serving_size, location=location, seasonal=seasonal,caffeine_amt= caffeine_amt, drink_picture=drink_picture)
    db.session.add(new_drink)
    db.session.commit()
    return success_response(new_drink.serialize(), 201)


@app.route("/api/register/", methods=["POST"])
def register_account():
    """
    Endpoint for registering a new session/ Creates a new User
    """
    body = json.loads(request.data)
    email = body.get("email")
    password = body.get("password")
    username = body.get("username")
    picture = body.get("picture")

    if email is None or password is None:
        return failure_response("Missing email or password", 400)
    
    if username is None: 
        return failure_response("Missing required info", 400)

    success, user = users_dao.create_user(email, password, username, picture)

    if not success:
        return failure_response("User already exists", 400)

    return success_response(user.serialize())

@app.route("/api/login/", methods=["POST"])
def login():
    """
    Endpoint for logging in
    """
    body = json.loads(request.data)
    email = body.get("email")
    password = body.get("password")

    if email is None or password is None:
        return failure_response("Missing email or password", 400)

    success, user = users_dao.verify_credentials(email, password)

    if not success:
        return failure_response("Incorrect email or password", 401)
    
    if user is None: 
        return failure_response("login error", 401)
    
    user.renew_session()

    return success_response({
        "session_token": user.session_token,
        "session_expiration": str(user.session_expiration),
        "update_token": user.update_token
    })

@app.route("/api/session/", methods=["POST"])
def update_session():
    """
    Endpoint for updating a user's session
    """
    success, update_token = extract_token(request)

    if not success:
        return update_token

    success_session, user = users_dao.renew_session(update_token)

    if not success_session:
        return failure_response("Invalid update token", 400)

    return success_response({
        "session_token": user.session_token,
        "session_expiration": str(user.session_expiration),
        "update_token": user.update_token
    })


@app.route("/api/logout/", methods=["POST"])
def logout():
    """
    Endpoint for logging out
    """
    success, session_token = extract_token(request)

    if not success:
        return failure_response("Could not extract session token", 400)

    user = users_dao.get_user_by_session_token(session_token)
    if user is None or not user.verify_session_token(session_token):
        return failure_response("Invalid session token", 400)

    user.session_token = ""
    user.session_expiration = datetime.datetime.now()
    user.update_token = ""

    db.session.commit()
    return success_response({"message": "You have successfully logged out."})

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)