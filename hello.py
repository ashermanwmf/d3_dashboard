import os
from flask import Flask, Blueprint, send_file, jsonify, Response
from flaskext.mysql import MySQL

#for mysql server
mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'EmpData'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

#for mysql server
@app.route("/Authenticate")
def Authenticate():
    username = request.args.get('Username')
    password = request.args.get('Password')
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from User where Username='" + username + "' and Password='" + password + "'")
    data = cursor.fetchone()
    if data is None:
        return "Username or Password is wrong"
    else:
        return "Logged in successfully"

# for acessing the right pasth to index.html in dashboards/
client_app = Blueprint('client_app', __name__,
                    static_url_path='/dashboard',
                    static_folder='dashboard',
                    template_folder='dashboard')

# show the index.html
@client_app.route('/', methods=['GET', 'POST'])
def home():
    return send_file('dashboard/index.html')

#sample json
x = { "name"    : "test"
    , "age"     : "12"}

# sample preform json
@client_app.route('/data', methods=['POST'])
def data():
    '''
        Query the DB for 'data' and return data as JSON
    '''
    return jsonify(x);

# sample preform json
@client_app.route('/dashboard/includes/data/<file>', methods=['POST'])
def october(file = None):
    '''
        Query the DB for 'data' and return data as JSON
    '''
    fileName = os.path.abspath('./dashboard/includes/data/' + file + '.json')
    with open(fileName, 'r') as f:
        ret = f.read()
    f.close()
    return Response(ret, mimetype="application/json")

# runs the server
app = Flask(__name__)
app.register_blueprint(client_app)
 
# runs the server
if __name__ == '__main__':
    app.run(debug = True, use_reloader = True)
  
