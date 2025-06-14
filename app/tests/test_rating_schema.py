import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from schemas.rating import RatingCreate

#Sample test data
sample_data = {
    "user_id": "user123",
    "destination_id": "dest456",
    "rating": 5,
    "review": "Absolutely amazing place!"
}

#Validate the schema
try:
    rating = RatingCreate(**sample_data)
    print(" RatingCreate is valid!")
    print(rating.model_dump_json(indent=2))
except Exception as e:
    print("Validation failed:", e)
