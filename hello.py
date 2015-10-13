from flask import Flask, Blueprint, send_file, jsonify

client_app = Blueprint('client_app', __name__,
                    static_url_path='/dashboard',
                    static_folder='dashboard',
                    template_folder='dashboard')

@client_app.route('/', methods=['GET', 'POST'])
def home():
    return send_file('dashboard/index.html')

#sample json
x = { "name"    : "test"
    , "age"     : "12"}

@client_app.route('/data', methods=['POST'])
def data():
    '''
        Query the DB for 'data' and return data as JSON
    '''
    return jsonify(x);



app = Flask(__name__)
app.register_blueprint(client_app)
 
if __name__ == '__main__':
    app.run(debug = True, use_reloader = True)
  
