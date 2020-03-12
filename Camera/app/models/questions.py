from app.extensions import db
import sqlalchemy
from sqlalchemy import Column, Integer, String


class Question(db.Model):
    __tablename__ = 'data'
    id = Column(Integer, primary_key=True)
    question = Column(String(64))
    description = Column(String(64))
    makeTime = Column(String(64))
    modifyTime = Column(String(64))