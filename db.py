import hashlib
import bcrypt
import os
import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

rating = db.Table("rating", db.Model.metadata,
                db.Column("user_id", db.Integer, db.ForeignKey('user.id')),
                db.Column("drink_id", db.Integer, db.ForeignKey('drink.id')),
                db.Column("wake_me_up", db.Integer)
                )

class User(db.Model):
    """
    documentations
    """
    __tablename__ = "user"

    userID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    passWord = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.LargeBinary, nullable=True)

    drink = db.relationship(
        "Drink",
        cascade="delete",
        secondary="rating",
        back_populates = "user"
    )
    def __init__(self, **kwargs):
       """
       Initialize Users object/entry
       """
       self.username = kwargs.get("username")
       self.email = kwargs.get("email")
       self.password_digest = bcrypt.hashpw(kwargs.get("passWord").encode("utf8"), bcrypt.gensalt(rounds=13))
       self.profile_picture = kwargs.get("profile_picture")
       self.renew_session()

    def _urlsafe_base_64(self):
        """
        Randomly generates hashed tokens (used for session/update tokens)
        """
        return hashlib.sha1(os.urandom(64)).hexdigest()

    def renew_session(self):
        """
        Renews the sessions, i.e.
        1. Creates a new session token
        2. Sets the expiration time of the session to be a day from now
        3. Creates a new update token
        """
        self.session_token = self._urlsafe_base_64()
        self.session_expiration = datetime.datetime.now() + datetime.timedelta(days=1)
        self.update_token = self._urlsafe_base_64()

    def verify_password(self, password):
        """
        Verifies the password of a user
        """
        return bcrypt.checkpw(password.encode("utf8"), self.password_digest)

    def verify_session_token(self, session_token):
        """
        Verifies the session token of a user
        """
        return session_token == self.session_token and datetime.datetime.now() < self.session_expiration

    def verify_update_token(self, update_token):
        """
        Verifies the update token of a user
        """
        return update_token == self.update_token
    
class Drink(db.Model):
    __tablename__ = "drink"

    drinkID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    serving_size = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String)
    seasonal = db.Column(db.Boolean, nullable=False)
    caffeine_amt = db.Column(db.Integer, nullable=False)
    
    user = db.relationship(
        "User",
        secondary="rating",
        back_populates = "drink"
    )
    
    