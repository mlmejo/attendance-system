from flask import jsonify
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required, set_access_cookies,
                                unset_jwt_cookies)
from flask_restful import Resource, reqparse
from werkzeug.security import check_password_hash, generate_password_hash

from . import db
from .models import User


class Register(Resource):

    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument(
            'name',
            type=str,
            required=True,
            help='Name field is required',
        )

        parser.add_argument(
            'email',
            type=str,
            required=True,
            help='Email address field is required',
        )

        parser.add_argument(
            'password',
            type=str,
            required=True,
            help='Password field is required',
        )

        args = parser.parse_args()

        user = User(
            name=args['name'],
            email=args['email'],
            password=generate_password_hash(args['password']),
        )

        db.session.add(user)

        db.session.commit()

        return {'status': 'User has been registered.'}, 201


class Login(Resource):

    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument(
            'email',
            type=str,
            required=True,
            help='Email address field is required',
        )

        parser.add_argument(
            'password',
            type=str,
            required=True,
            help='Password field is required',
        )

        args = parser.parse_args()

        user = User.query.filter_by(email=args['email']).first()

        if not (user and check_password_hash(user.password, args['password'])):
            return {
                'status': 'The provided credentials do not match our records.'
            }, 404

        access_token = create_access_token(identity=user.name)

        response = jsonify({'status': 'Login success'})

        set_access_cookies(response, access_token)

        return response


class Logout(Resource):

    def delete(self):
        response = jsonify({'status': 'Logout success'})

        unset_jwt_cookies(response)

        return response


class CurrentUser(Resource):

    @jwt_required()
    def get(self):
        identity = get_jwt_identity()

        current_user = User.query.filter_by(name=identity).first()

        return {
            'user': {
                'name': current_user.name,
                'email': current_user.email
            }
        }


class Student(Resource):

    def get(self):
        pass

    def post(self):
        pass


class Teacher(Resource):

    def get(self):
        pass

    def post(self):
        pass
