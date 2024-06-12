from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Post, Bio

app = Flask(__name__)

# DATABASE CONFIGURATION
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://JohnRonnie254:Kenya%40254@localhost/pseudo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'johnronnieochieng'
app.config['JWT_SECRET_KEY'] = 'johnronnieochieng'

# Initialize Flask JWT Extended
jwt = JWTManager(app)
migrate = Migrate(app, db)
CORS(app)

# Initialize Flask SQLAlchemy
db.init_app(app)

@app.route('/h')
def show():
    return "This is our backend"

@app.route('/home', methods=['POST'])
def make_a_post():
    data = request.json
    username = data.get('username')
    post_content = data.get('content')

    user = User.query.get(username)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    new_post = Post(content=post_content, username=username)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({'message': 'Post created successfully'}), 201

@app.route('/homepage')
def home():
    posts = Post.query.all()
    formatted_posts = [
        {
            'content': post.content, 
            'username': post.username
        } 
        for post in posts
    ]

    return jsonify(formatted_posts)

@app.route('/bio/<username>', methods=['GET'])
def get_bio(username):
    user = User.query.get(username)
    if not user or not user.bio:
        return jsonify({'error': 'User or Bio not found'}), 404

    bio = user.bio
    return jsonify({'bio': bio.content})

@app.route('/bio', methods=['POST'])
def update_bio():
    data = request.json
    username = data.get('username')
    bio_content = data.get('content')

    user = User.query.get(username)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if user.bio:
        user.bio.content = bio_content
    else:
        new_bio = Bio(content=bio_content, username=username)
        db.session.add(new_bio)

    db.session.commit()
    return jsonify({'message': 'Bio updated successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
