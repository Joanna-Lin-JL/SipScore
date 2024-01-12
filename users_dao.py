"""
DAO (Data Access Object) file

Helper file containing functions for accessing data in our database
"""
import db
from db import User


def get_user_by_id(id):
    """
    Returns a user object from the database given an email
    """
    return User.query.filter(User.userID == id).first()


def get_user_by_session_token(session_token):
    """
    Returns a user object from the database given a session token
    """
    return User.query.filter(User.session_token == session_token).first()


def get_user_by_update_token(update_token):
    """
    Returns a user object from the database given an update token
    """
    return User.query.filter(User.update_token == update_token).first()


def verify_credentials(id, password):
    """
    Returns true if the credentials match, otherwise returns false
    """
    optional_user = get_user_by_id(id)
    
    if optional_user is None:
        return False, None

    return optional_user.verify_password(password), optional_user


def create_user(id, password):
    """
    Creates a User object in the database

    Returns if creation was successful, and the User object
    """
    optional_user = get_user_by_id(id)
    
    if optional_user is not None:
        return False, optional_user

    user = User(userId = id, passWord = password)
    db.session.add(user)
    db.session.commit()



def renew_session(update_token):
    """
    Renews a user's session token
    
    Returns the User object
    """
    user = get_user_by_update_token(update_token)

    if user is None:
        raise Exception("Invalid update token")

    user.renew_session()
    db.session.commit()
    return user
