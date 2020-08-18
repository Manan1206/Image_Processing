from tensorflow import keras
from PIL import Image
import argparse

parser = argparse.ArgumentParser(description='Classify an image.')
parser.add_argument("--image", "-i", required = True, help = "Path to input image")

args = parser.parse_args()
print(args)
print(args.image)

image = Image.open('args.image')
image.size = (28,28)

# model = keras.models.load_model('housing-model.h5')
# model.predict