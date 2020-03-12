from flask import Flask
from flask_cors import CORS
from app.config import *
from app.extensions import db, migrate
from app.views.getInfo import get_info
from app.views.test import test


def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    CORS(app, resources=r'/*')

    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
    app.config['DEBUG'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    migrate.init_app(app=app)
    # 注册
    app.register_blueprint(get_info)
    app.register_blueprint(test)

    return app
