from app import create_app

app = create_app()


@app.route('/', methods=['GET'])
def hello():
    return 'hello'


if __name__ == '__main__':
    app.run()
