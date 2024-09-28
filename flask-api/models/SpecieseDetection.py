import pandas as pd
import numpy as np
from scipy.stats import mode
import os
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import joblib

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

new_values = [
    ['Moderate', 'Vegetable', 'Tree', 'Full Sun', 21, 'High', 'Deep watering', 'Well-draining', 'Low']
]

ensemble_predictions, all_predictions = cross_check_predictions(models, new_values, label_encoders, scaler)

ensemble_predicted_names = label_encoders['Plant_Name'].inverse_transform(ensemble_predictions.astype(int)).tolist()
print("Most Suitable for your environment:", ensemble_predicted_names)

# Get images for the ensemble prediction
ensemble_images = get_predicted_plant_images(ensemble_predicted_names, r'C:\Users\deeks\Documents\GreenUrbanLandScaping\Spceies_photos')

# Display images for the ensemble predictions
for img, name in ensemble_images:
    plt.imshow(img)
    plt.axis('off')
    plt.title(f"Most Suitable for your environment: {name}")
    plt.show()

# Collect all unique predictions from individual models, including ensemble predictions
unique_predictions = set()
for predictions in all_predictions.flatten():  # Flatten to access each prediction
    unique_predictions.add(label_encoders['Plant_Name'].inverse_transform([predictions])[0])

# Add ensemble predictions to unique predictions
unique_predictions.update(ensemble_predicted_names)
# Get images for all unique predictions
if unique_predictions:
    print("Some More Recommendations are:")
    unique_images = get_predicted_plant_images(list(unique_predictions), r'C:\Users\deeks\Documents\GreenUrbanLandScaping\Spceies_photos')
    
    # Display unique recommended plant images
    for img, name in unique_images:
        plt.imshow(img)
        plt.axis('off')
        plt.title(f"Recommended: {name}")
        plt.show()
