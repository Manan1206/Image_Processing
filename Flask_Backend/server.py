from flask import Flask, request
import os
import sys

sys.path.append('D:\Projects\Image_Processing_web_app\Python_Scripts\clothes-classifier')
from clothes_model import classify_clothes

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/classifyclothes')
def classify_image():
    image_name = request.args.get('image_name')
    if not image_name:
        return 'Please Provide an image'
    output = classify_clothes(image_name)
    return output
    # os.chdir('D:\Projects\Image_Processing_web_app\Python_scripts\clothes-classifier')
    # os.system('python clothes_model.py {}', image_name)  


if __name__ == "__main__":
    app.run(debug=True)