from flask import Blueprint, request, jsonify
from app.models.questions import Question
from app.extensions import db
import time
import json

get_info = Blueprint('get_info', __name__)


@get_info.route('/', methods=['GET'])
def _get_info():
    data = []
    database = Question.query.all()
    for item in database:
        data_dict = {
            'id': item.id,
            'question': item.question,
            'description': item.description,
            'makeTime': item.makeTime,
            'modifyTime': item.modifyTime
        }
        data.append(data_dict)
        data.sort(key=lambda item: item['id'], reverse=True)
    return jsonify({'data': data})


@get_info.route('/insert/', methods=['POST'])
def _insert():
    data = request.get_data()
    data = json.loads(data)
    print(data, '4444')
    t = time.strftime('%Y/%m/%d-%H:%M:%S', time.localtime())
    questions = data['question']
    descriptions = data['description']
    for i, item in enumerate(questions):
        question = item
        description = descriptions[i]
        makeTime = t
        modifyTime = t
        q = Question(question=question, description=description,
                     makeTime=makeTime, modifyTime=modifyTime)
        db.session.add(q)
        db.session.commit()
    res = {'data': data, 'code': 200, 'msg': 'insert success'}
    return res


@get_info.route('/delete/', methods=['POST'])
def _delete():
    data = request.get_data()
    data = json.loads(data)
    print(data['id'], '4444')
    q = Question.query.filter(Question.id==data['id']).first()
    db.session.delete(q)
    db.session.commit()
    print('删除', q)
    return data


@get_info.route('/modify/', methods=['POST'])
def _modify():
    t = time.strftime('%Y/%m/%d-%H:%M:%S', time.localtime())
    data = request.get_data()
    data = json.loads(data)
    print(data, '4444')
    q = Question.query.filter(Question.id == data['id']).first()
    q.question = data['question']
    q.description = data['description']
    q.modifyTime = t
    db.session.commit()
    return '数据修改成功'