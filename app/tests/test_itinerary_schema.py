import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from schemas.itinerary import ItineraryCreate

# Sample test data
sample_data = {
    "user_id": "123abc",
    "title": "Kathmandu to Pokhara Road Trip",
    "days": [
        {"day": 1, "destinations": ["dest1", "dest2"]},
        {"day": 2, "destinations": ["dest3"]}
    ]
}

# Validate the schema
try:
    itinerary = ItineraryCreate(**sample_data)
    print(" ItineraryCreate is valid!")
    print(itinerary.model_dump_json(indent=2))
except Exception as e:
    print(" Validation failed:", e)
