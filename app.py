from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'geekprofile' #????
 
mysql = MySQL(app)

@app.route("/")

def home():
	return "Hello, world!"

if __name__ == "__main__":
    app.run(host="localhost", port=int("5000"))