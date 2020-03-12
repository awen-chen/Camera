from flask import Blueprint, request, jsonify
from app.models.questions import Question
from app.extensions import db
import time
import json

test = Blueprint('test', __name__)


@test.route('/test/', methods=['GET'])
def _test():
    database = Question.query.all()
    print(database, type(database))
    data = {'data': database}
    return '查询成功'