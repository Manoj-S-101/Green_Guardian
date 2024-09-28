import cv2
import numpy as np
import uuid

def suggest_green_space_locations(image_path):
    image = cv2.imread(image_path)
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    lower_color = np.array([0, 0, 0])
    upper_color = np.array([180, 255, 100])
    mask = cv2.inRange(hsv_image, lower_color, upper_color)
    mask_inv = cv2.bitwise_not(mask)
    contours, _ = cv2.findContours(mask_inv, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for contour in contours:
        area = cv2.contourArea(contour)
        if area > 500:
            cv2.drawContours(image, [contour], -1, (0, 255, 0), 2)

    output_path = f"processed_{uuid.uuid4()}.jpg"
    cv2.imwrite(output_path, image)
    return output_path