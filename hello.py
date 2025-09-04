from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
    app.run(debug=True)

#https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world