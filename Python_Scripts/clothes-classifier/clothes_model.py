from tensorflow import keras
from PIL import Image, ImageOps
import argparse
import numpy as np
from numpy import asarray  
import os

def classify_clothes(image_name):

    os.chdir('D:\Projects\Image_Processing_web_app\Images')

    # parser = argparse.ArgumentParser(description='Classify an image.')
    # parser.add_argument("--image", "-i", required = True, help = "Path to input image")

    # args = parser.parse_args()

    # image = Image.open(args.image)
    image = Image.open(image_name)
    # image.show()
    resized_image = image.resize((28,28))
    # resized_image.show()
    # Change Image to grayscale
    gray_image = ImageOps.grayscale(resized_image)
    img = (np.expand_dims(gray_image,0))


    os.chdir('D:\Projects\Image_Processing_web_app\Python_scripts\clothes-classifier')
    class_names = ["T-shirt/top", "Trouser", "Pullover", "Dress", "Coat", "Sandal", "Shirt", "Sneaker", "Bag",  "Ankle boot"]

    model = keras.models.load_model('clothes-model.h5')
    print(class_names[model.predict_classes(img)[0]])
    print(model.predict(img))

    return class_name[model.predict_classes(img)[0]]