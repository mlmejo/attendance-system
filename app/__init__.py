from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['JWT_SECRET_KEY'] = 'secret-key'
    app.config['JWT_COOKIE_HTTPONLY'] = True
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
    app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
    app.config['JWT_COOKIE_SAMESITE'] = 'Lax'

    db.init_app(app)
    CORS(app, supports_credentials=True)
    JWTManager(app)

    api = Api(app)

    from .resources import CurrentUser, Login, Logout, Register

    api.add_resource(Login, '/api/auth/login')
    api.add_resource(Register, '/api/auth/register')
    api.add_resource(Logout, '/api/auth/logout')
    api.add_resource(CurrentUser, '/api/users/me')

    return app
