from flask import Flask, request, jsonify, send_from_directory
import os
import numpy as np
import tensorflow as tf
from models.green_space import suggest_green_space_locations
import pandas as pd
import numpy as np
from scipy.stats import mode
import os
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import joblib

app = Flask(__name__)

model_names = [
    r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\Logistic_Regression_model.joblib',
    r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\Random_Forest_model.joblib',
    r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\SVM_model.joblib',
    r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\Decision_Tree_model.joblib',
    r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\Naive_Bayes_model.joblib',
    r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\K-Nearest_Neighbors_model.joblib'
]

models = {name.replace('_model.joblib', '').replace('_', ' '): joblib.load(name) for name in model_names}
scaler = joblib.load(r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\scaler.joblib')
label_encoders = joblib.load(r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\label_encoders.joblib')

def cross_check_predictions(models, new_data, label_encoders, scaler):
    new_df = pd.DataFrame(new_data, columns=[
        'Watering_Frequency', 'Plant_Type', 'Growth_Habit', 'Light_Requirements',
        'Temperature_Tolerance', 'Humidity_Requirements', 'Watering_Needs', 'Soil_Type', 'Care_Level'
    ])

    for column in new_df.columns:
        if column in label_encoders:
            new_df[column] = label_encoders[column].transform(new_df[column])

    new_data_scaled = scaler.transform(new_df)

    all_predictions = []
    for name, model in models.items():
        predictions = model.predict(new_data_scaled)
        all_predictions.append(predictions)

    all_predictions = np.array(all_predictions)
    ensemble_predictions = mode(all_predictions, axis=0).mode[0]
    ensemble_predictions = ensemble_predictions.flatten()

    return ensemble_predictions, all_predictions  # Return ensemble and all predictions

def get_predicted_plant_images(predicted_plant_names, image_folder):
    images = []
    supported_extensions = ['.jpeg', '.jpg', '.png', '.webp', '.bmp', '.gif']
    
    for predicted_plant_name in predicted_plant_names:
        image_path = None
        for ext in supported_extensions:
            potential_path = os.path.join(image_folder, f"{predicted_plant_name}{ext}")
            if os.path.exists(potential_path):
                image_path = potential_path
                break
        
        if image_path:
            img = mpimg.imread(image_path)
            images.append((img, predicted_plant_name))
        else:
            print(f"Image for {predicted_plant_name} not found in supported formats.")
    
    return images  # Return list of images

# Load the trained model once
model = tf.keras.models.load_model(r'C:\Users\deeks\Documents\WebApp\Green_Guardian\flask-api\models\plant_leaf_disease_detector.h5')
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Function to preprocess a single image
def preprocess_single_image(img_path, target_size=(224, 224)):
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=target_size)
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions to fit model input
    img_array = img_array / 255.0  # Normalize the image
    return img_array

# Function to predict the class of a single image
def predict_image_class(model, img_path, class_names):
    img_array = preprocess_single_image(img_path)
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    return class_names[predicted_class_index]

# Function to return prediction and solution
def get_prediction_results(img_path, model, class_names):
    predicted_class = predict_image_class(model, img_path, class_names)
    solution = disease_solutions.get(predicted_class, "No solution available.")
    return predicted_class, img_path, solution

# Solutions for each disease category
disease_solutions = {
    "Apple___Apple_scab": "Apply appropriate fungicides such as myclobutanil or thiophanate-methyl during the early growing season. Remove infected leaves and debris from the ground to reduce disease spread.",
    "Apple___Black_rot": "Remove infected leaves and fruit immediately. Use fungicides that contain myclobutanil or propiconazole. Practice crop rotation and ensure good air circulation around plants.",
    "Apple___Cedar_apple_rust": "Remove cedar trees within 1000 feet of apple orchards. Apply fungicides before flowering and again after petal fall. Maintain proper pruning practices to enhance air circulation.",
    "Apple___healthy": "Maintain good agricultural practices including regular pruning, proper watering, and soil management. Monitor for pests and diseases regularly.",
    "Blueberry___healthy": "Ensure proper pH levels (4.5-5.5) in the soil, apply mulch to retain moisture, and prune dead or diseased branches. Fertilize appropriately during the growing season.",
    "Cherry_(including_sour)___healthy": "Monitor for pests and diseases. Ensure proper watering and nutrient management. Prune for good airflow and remove any dead or diseased branches.",
    "Cherry_(including_sour)___Powdery_mildew": "Use fungicides such as sulfur or myclobutanil. Ensure good air circulation by proper pruning. Remove infected leaves and apply potassium bicarbonate as a preventative measure.",
    "Corn_(maize)___Cercospora_leaf_spot": "Use resistant varieties and apply fungicides containing azoxystrobin. Practice crop rotation and ensure proper field drainage.",
    "Corn_(maize)___Common_rust_": "Use resistant corn hybrids. Apply fungicides if the disease appears before tasseling. Rotate crops and manage weeds to reduce disease spread.",
    "Corn_(maize)___healthy": "Follow crop rotation, maintain good soil health, and manage irrigation properly. Monitor for pests and diseases.",
    "Corn_(maize)___Northern_Leaf_Blight": "Plant resistant hybrids and apply fungicides when symptoms first appear. Remove and destroy infected plant debris after harvest.",
    "Grape___Black_rot": "Remove and destroy infected plant debris. Apply fungicides at the early bloom stage and post-bloom. Ensure good airflow through canopy management.",
    "Grape___Esca_(Black_Measles)": "Remove and destroy infected vines immediately. Practice good sanitation and avoid planting susceptible varieties in the same area.",
    "Grape___healthy": "Maintain good vineyard hygiene, prune for airflow, and monitor regularly for pests. Use appropriate fertilizers and irrigation practices.",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Apply fungicides containing chlorothalonil or myclobutanil during early stages of growth. Remove infected leaves to reduce spread.",
    "Orange___Haunglongbing_(Citrus_greening)": "Remove infected trees and ensure planting of disease-free plants. Control psyllid vectors with insecticides.",
    "Peach___Bacterial_spot": "Remove infected plants and use disease-free seeds. Apply copper-based bactericides during dormant seasons to protect new growth.",
    "Peach___healthy": "Monitor for pests and diseases, maintain soil moisture, and ensure balanced nutrition. Prune to enhance air circulation.",
    "Pepper,_bell___Bacterial_spot": "Remove infected plants and use copper-based bactericides. Practice crop rotation and avoid overhead watering to reduce leaf wetness.",
    "Pepper,_bell___healthy": "Maintain proper soil moisture, fertilization, and pest management. Ensure adequate spacing for air circulation.",
    "Potato___Early_blight": "Apply fungicides such as chlorothalonil or mancozeb. Rotate crops and remove infected foliage to prevent spread.",
    "Potato___healthy": "Maintain good irrigation and soil management practices. Monitor for pests and diseases regularly.",
    "Potato___Late_blight": "Use resistant varieties and apply fungicides like mefenoxam. Remove and destroy infected plants and debris promptly.",
    "Raspberry___healthy": "Monitor for pests and diseases, maintain good soil health, and prune regularly for airflow.",
    "Soybean___healthy": "Rotate crops, manage soil fertility, and monitor for pests and diseases. Use resistant varieties when possible.",
    "Squash___Powdery_mildew": "Use sulfur-based fungicides and ensure proper air circulation. Remove infected leaves and practice crop rotation.",
    "Strawberry___healthy": "Maintain good irrigation practices, monitor for pests, and remove weeds. Fertilize based on soil test results.",
    "Strawberry___Leaf_scorch": "Ensure proper watering practices to avoid water stress. Remove and destroy infected leaves and maintain soil moisture.",
    "Tomato___Bacterial_spot": "Remove infected plants and use copper-based bactericides. Implement crop rotation and avoid overhead watering.",
    "Tomato___Early_blight": "Apply fungicides early in the growing season and remove infected leaves to prevent spread.",
    "Tomato___healthy": "Maintain proper watering and nutrient levels, monitor for pests, and practice good sanitation.",
    "Tomato___Late_blight": "Use resistant varieties, apply fungicides, and remove infected plants to prevent the spread of the disease.",
    "Tomato___Leaf_Mold": "Ensure proper air circulation and avoid overhead watering. Use fungicides if necessary.",
    "Tomato___Septoria_leaf_spot": "Apply fungicides at the first sign of symptoms and remove infected leaves promptly.",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Use miticides and promote beneficial insects. Monitor regularly for infestation.",
    "Tomato___Target_Spot": "Apply fungicides early and remove infected plant debris after harvest to reduce disease pressure.",
    "Tomato___Tomato_mosaic_virus": "Remove infected plants and control aphid populations that spread the virus. Ensure crop rotation and sanitation.",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Remove infected plants and control whitefly populations. Implement good agricultural practices to reduce pest pressure."

}

# Directory path to training data for class names
train_data_dir = r'C:\Users\deeks\Documents\GreenUrbanLandScaping\deseases\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train'
class_names = os.listdir(train_data_dir)  # Retrieve class names from directory

@app.route('/api/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    image_file = request.files['image']
    image_path = f"./uploads/{image_file.filename}"
    image_file.save(image_path)
    
    processed_image_path = suggest_green_space_locations(image_path)

    return jsonify({"processed_image_path": processed_image_path})

@app.route('/api/predict-disease', methods=['POST'])
def predict_disease():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    image_file = request.files['image']
    image_path = f"./uploads/{image_file.filename}"
    image_file.save(image_path)

    predicted_class, img_path, solution = get_prediction_results(image_path, model, class_names)
    
    return jsonify({
        "predicted_class": predicted_class,
        "image_path": img_path,
        "solution": solution
    })

@app.route('/api/recommend-plants', methods=['POST'])
def recommend_plants():
    data = request.json
    Plant_Type = data.get('plantType')
    Watering_Frequency = data.get('waterAvailability')
    Soil_Type = data.get('soilType')
    Growth_Habit=data.get('growthHabit')
    Light_Requirements=data.get('sunlightExposure')
    Humidity_Requirements=data.get('humidityRequirements')
    Care_Level=data.get('careLevel')
    Watering_Needs=data.get('wateringNeeds')
    # Here you would extract any other necessary features you need for prediction
    # Prepare the input data for prediction
    new_data = [
        [
           Watering_Frequency, Plant_Type, Growth_Habit, Light_Requirements,
        '25', Humidity_Requirements, Watering_Needs, Soil_Type, Care_Level
        ]
    ]

    # Get predictions
    ensemble_predictions, all_predictions = cross_check_predictions(models, new_data, label_encoders, scaler)
    ensemble_predicted_names = label_encoders['Plant_Name'].inverse_transform(ensemble_predictions.astype(int)).tolist()

# Collect unique predictions from all models
    unique_predictions = set()
    for predictions in all_predictions.flatten():  # Flatten to access each prediction
        unique_predictions.add(label_encoders['Plant_Name'].inverse_transform([predictions])[0])

# Add ensemble predictions to the unique predictions set
    unique_predictions.update(ensemble_predicted_names)

# Convert set back to list for ordered processing
    unique_predictions = list(unique_predictions)

# Get images for the unique set of predicted plants
    ensemble_images = get_predicted_plant_images(unique_predictions, r'C:\Users\deeks\Documents\GreenUrbanLandScaping\Spceies_photos')
    image_paths = []

# Save processed images and construct image paths
    for predicted_plant_name, (img, img_path) in zip(unique_predictions, ensemble_images):
        processed_image_path = f"./processed_{predicted_plant_name.replace(' ', '_')}.png"  # Use plant name as filename
        plt.imsave(processed_image_path, img)  # Save processed images to the uploads folder
        image_paths.append((predicted_plant_name, processed_image_path))  # Store the path

    return jsonify({
        "recommended_plants": unique_predictions,
        "images": image_paths
    })

@app.route('/processed-images/<filename>', methods=['GET'])
def get_processed_image(filename):
    return send_from_directory('.', filename)

if __name__ == "__main__":
    os.makedirs('./uploads', exist_ok=True)
    app.run(port=8000, debug=True)
