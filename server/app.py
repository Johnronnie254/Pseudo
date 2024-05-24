from flask import Flask
from auth import auth_bp
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from models import db, User

app = Flask(__name__)

# DATABASE CONFIGURATION
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://JohnRonnie254:Kenya%40254@localhost/pseudo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize Flask JWT Extended
jwt = JWTManager(app)
migrate = Migrate(app,db)

# Initialize Flask SQLAlchemy
db.init_app(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route('/home')
def home():
    return f"This is our backend"

if __name__ == '__main__':
    app.run(debug=True)
