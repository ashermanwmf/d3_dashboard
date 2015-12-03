'''
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>
'''

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

# for acessing the right path to index.html in dashboards/
client_app = Blueprint('client_app', __name__,
                    static_url_path='/dashboard',
                    static_folder='dashboard',
                    template_folder='dashboard')

# show the index.html
@client_app.route('/', methods=['GET', 'POST'])
def home():
    return send_file('dashboard/index.html')

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

