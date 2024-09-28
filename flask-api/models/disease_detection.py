# import os
# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.preprocessing import image
# import matplotlib.pyplot as plt  

# # Load the trained model once
# model = tf.keras.models.load_model(r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\plant_leaf_disease_detector.h5')

# # model = tf.keras.models.load_model(r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\plant_leaf_disease_detector.h5')
# model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# # Solutions for each disease category
# disease_solutions = {
#     "Apple___Apple_scab": "Apply appropriate fungicides such as myclobutanil or thiophanate-methyl during the early growing season. Remove infected leaves and debris from the ground to reduce disease spread.",
#     "Apple___Black_rot": "Remove infected leaves and fruit immediately. Use fungicides that contain myclobutanil or propiconazole. Practice crop rotation and ensure good air circulation around plants.",
#     "Apple___Cedar_apple_rust": "Remove cedar trees within 1000 feet of apple orchards. Apply fungicides before flowering and again after petal fall. Maintain proper pruning practices to enhance air circulation.",
#     "Apple___healthy": "Maintain good agricultural practices including regular pruning, proper watering, and soil management. Monitor for pests and diseases regularly.",
#     "Blueberry___healthy": "Ensure proper pH levels (4.5-5.5) in the soil, apply mulch to retain moisture, and prune dead or diseased branches. Fertilize appropriately during the growing season.",
#     "Cherry_(including_sour)___healthy": "Monitor for pests and diseases. Ensure proper watering and nutrient management. Prune for good airflow and remove any dead or diseased branches.",
#     "Cherry_(including_sour)___Powdery_mildew": "Use fungicides such as sulfur or myclobutanil. Ensure good air circulation by proper pruning. Remove infected leaves and apply potassium bicarbonate as a preventative measure.",
#     "Corn_(maize)___Cercospora_leaf_spot": "Use resistant varieties and apply fungicides containing azoxystrobin. Practice crop rotation and ensure proper field drainage.",
#     "Corn_(maize)___Common_rust_": "Use resistant corn hybrids. Apply fungicides if the disease appears before tasseling. Rotate crops and manage weeds to reduce disease spread.",
#     "Corn_(maize)___healthy": "Follow crop rotation, maintain good soil health, and manage irrigation properly. Monitor for pests and diseases.",
#     "Corn_(maize)___Northern_Leaf_Blight": "Plant resistant hybrids and apply fungicides when symptoms first appear. Remove and destroy infected plant debris after harvest.",
#     "Grape___Black_rot": "Remove and destroy infected plant debris. Apply fungicides at the early bloom stage and post-bloom. Ensure good airflow through canopy management.",
#     "Grape___Esca_(Black_Measles)": "Remove and destroy infected vines immediately. Practice good sanitation and avoid planting susceptible varieties in the same area.",
#     "Grape___healthy": "Maintain good vineyard hygiene, prune for airflow, and monitor regularly for pests. Use appropriate fertilizers and irrigation practices.",
#     "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Apply fungicides containing chlorothalonil or myclobutanil during early stages of growth. Remove infected leaves to reduce spread.",
#     "Orange___Haunglongbing_(Citrus_greening)": "Remove infected trees and ensure planting of disease-free plants. Control psyllid vectors with insecticides.",
#     "Peach___Bacterial_spot": "Remove infected plants and use disease-free seeds. Apply copper-based bactericides during dormant seasons to protect new growth.",
#     "Peach___healthy": "Monitor for pests and diseases, maintain soil moisture, and ensure balanced nutrition. Prune to enhance air circulation.",
#     "Pepper,_bell___Bacterial_spot": "Remove infected plants and use copper-based bactericides. Practice crop rotation and avoid overhead watering to reduce leaf wetness.",
#     "Pepper,_bell___healthy": "Maintain proper soil moisture, fertilization, and pest management. Ensure adequate spacing for air circulation.",
#     "Potato___Early_blight": "Apply fungicides such as chlorothalonil or mancozeb. Rotate crops and remove infected foliage to prevent spread.",
#     "Potato___healthy": "Maintain good irrigation and soil management practices. Monitor for pests and diseases regularly.",
#     "Potato___Late_blight": "Use resistant varieties and apply fungicides like mefenoxam. Remove and destroy infected plants and debris promptly.",
#     "Raspberry___healthy": "Monitor for pests and diseases, maintain good soil health, and prune regularly for airflow.",
#     "Soybean___healthy": "Rotate crops, manage soil fertility, and monitor for pests and diseases. Use resistant varieties when possible.",
#     "Squash___Powdery_mildew": "Use sulfur-based fungicides and ensure proper air circulation. Remove infected leaves and practice crop rotation.",
#     "Strawberry___healthy": "Maintain good irrigation practices, monitor for pests, and remove weeds. Fertilize based on soil test results.",
#     "Strawberry___Leaf_scorch": "Ensure proper watering practices to avoid water stress. Remove and destroy infected leaves and maintain soil moisture.",
#     "Tomato___Bacterial_spot": "Remove infected plants and use copper-based bactericides. Implement crop rotation and avoid overhead watering.",
#     "Tomato___Early_blight": "Apply fungicides early in the growing season and remove infected leaves to prevent spread.",
#     "Tomato___healthy": "Maintain proper watering and nutrient levels, monitor for pests, and practice good sanitation.",
#     "Tomato___Late_blight": "Use resistant varieties, apply fungicides, and remove infected plants to prevent the spread of the disease.",
#     "Tomato___Leaf_Mold": "Ensure proper air circulation and avoid overhead watering. Use fungicides if necessary.",
#     "Tomato___Septoria_leaf_spot": "Apply fungicides at the first sign of symptoms and remove infected leaves promptly.",
#     "Tomato___Spider_mites Two-spotted_spider_mite": "Use miticides and promote beneficial insects. Monitor regularly for infestation.",
#     "Tomato___Target_Spot": "Apply fungicides early and remove infected plant debris after harvest to reduce disease pressure.",
#     "Tomato___Tomato_mosaic_virus": "Remove infected plants and control aphid populations that spread the virus. Ensure crop rotation and sanitation.",
#     "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Remove infected plants and control whitefly populations. Implement good agricultural practices to reduce pest pressure."
# }

# # # Function to preprocess a single image
# # def preprocess_single_image(img_path, target_size=(224, 224)):
# #     img = image.load_img(img_path, target_size=target_size)
# #     img_array = image.img_to_array(img)
# #     img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions to fit model input
# #     img_array = img_array / 255.0  # Normalize the image
# #     return img_array

# # # Function to predict the class of a single image
# # def predict_image_class(model, img_path, class_names):
# #     img_array = preprocess_single_image(img_path)
# #     predictions = model.predict(img_array)
# #     predicted_class_index = np.argmax(predictions, axis=1)[0]
# #     return class_names[predicted_class_index]

# # # Function to display prediction and solution
# # def display_results(img_path, predicted_class, solution):
# #     plt.imshow(image.load_img(img_path))
# #     plt.title(f"Predicted Class: {predicted_class}")
# #     plt.axis('off')
# #     plt.show()
# #     print(f"Solution for {predicted_class}: {solution}")

# # # Directory path to training data for class names
# # train_data_dir = r'C:\Users\deeks\Documents\GreenUrbanLandScaping\deseases\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train'
# # class_names = os.listdir(train_data_dir)  # Retrieve class names from directory

# # # Test Image Path
# # test_image_path = r'C:\Users\deeks\Documents\GreenUrbanLandScaping\deseases\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train\Apple___Cedar_apple_rust\0a41c25a-f9a6-4c34-8e5c-7f89a6ac4c40___FREC_C.Rust 9807(1).JPG'

# # # Perform prediction
# # predicted_class = predict_image_class(model, test_image_path, class_names)

# # # Display results and solution
# # solution = disease_solutions.get(predicted_class, "No solution available.")
# # display_results(test_image_path, predicted_class, solution)

# # Function to preprocess a single image
# def preprocess_single_image(img_path, target_size=(224, 224)):
#     img = image.load_img(img_path, target_size=target_size)
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions to fit model input
#     img_array = img_array / 255.0  # Normalize the image
#     return img_array

# # Function to predict the class of a single image
# def predict_image_class(model, img_path, class_names):
#     img_array = preprocess_single_image(img_path)
#     predictions = model.predict(img_array)
#     predicted_class_index = np.argmax(predictions, axis=1)[0]
#     return class_names[predicted_class_index]

# # Function to return prediction and solution
# def get_prediction_results(img_path, model, class_names):
#     predicted_class = predict_image_class(model, img_path, class_names)
#     solution = disease_solutions.get(predicted_class, "No solution available.")
#     return predicted_class, img_path, solution

# # Directory path to training data for class names
# train_data_dir = r'C:\Users\deeks\Documents\GreenUrbanLandScaping\deseases\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train'
# class_names = os.listdir(train_data_dir)  # Retrieve class names from directory

# # Test Image Path
# test_image_path = r'C:\Users\deeks\Documents\GreenUrbanLandScaping\deseases\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train\Apple___Cedar_apple_rust\0a41c25a-f9a6-4c34-8e5c-7f89a6ac4c40___FREC_C.Rust 9807(1).JPG'

# # Get prediction results
# predicted_class, img_path, solution = get_prediction_results(test_image_path, model, class_names)

# # Example of how to use the returned values
# print(f"Predicted Class: {predicted_class}")
# print(f"Image Path: {img_path}")
# print(f"Solution: {solution}")


import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import cv2
import uuid

model = tf.keras.models.load_model(r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\plant_leaf_disease_detector.h5')
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

disease_solutions = {
    "Apple___Apple_scab": "Apply appropriate fungicides such as myclobutanil or thiophanate-methyl during the early growing season. Remove infected leaves and debris from the ground to reduce disease spread.",
    "Apple___Black_rot": "Remove infected leaves and fruit immediately. Use fungicides that contain myclobutanil or propiconazole. Practice crop rotation and ensure good air circulation around plants.",
    # ... (other diseases)
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Remove infected plants and control whitefly populations. Implement good agricultural practices to reduce pest pressure."
}

def preprocess_single_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

def predict_image_class(model, img_path, class_names):
    img_array = preprocess_single_image(img_path)
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    return class_names[predicted_class_index]

def get_prediction_results(img_path, model, class_names):
    predicted_class = predict_image_class(model, img_path, class_names)
    solution = disease_solutions.get(predicted_class, "No solution available.")
    return predicted_class, img_path, solution

def process_image(image_path):
    train_data_dir = r'C:\Users\deeks\Documents\GreenUrbanLandScaping\deseases\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train'
    class_names = os.listdir(train_data_dir)
    
    predicted_class, img_path, solution = get_prediction_results(image_path, model, class_names)
    return predicted_class, img_path, solution

# Example of calling the function
test_image_path = r'C:\Users\deeks\Documents\GreenUrbanLandScaping\deseases\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train\Apple___Cedar_apple_rust\0a41c25a-f9a6-4c34-8e5c-7f89a6ac4c40___FREC_C.Rust 9807(1).JPG'
results = process_image(test_image_path)

# This will keep the process alive to handle further requests
while True:
    predicted_class, img_path, solution = results
    # You can add more functionality here to re-call or process more images if needed
    break  # Remove this break statement if you want to keep it running for additional processing
