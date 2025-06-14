# app/tests/test_location_schema.py

import sys
import os
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from schemas.location import LocationMetadataCreate, LocationMetadataOut

# Sample test
sample_location = {
    "destination_id": "65ff123abc456def78900012",
    "altitude": 4380.0,
    "climate": "alpine",
    "population": None,
    "timezone": "Asia/Kathmandu",
    "region": "Rasuwa",
    "terrain_type": "mountain"
}

try:
    metadata = LocationMetadataCreate(**sample_location)
    print("✅ LocationMetadataCreate is valid!")
    print(metadata.model_dump_json(indent=2))
except Exception as e:
    print("❌ Validation failed:", e)

# Test output schema
try:
    output = LocationMetadataOut(**sample_location, id="loc1234567890")
    print("✅ LocationMetadataOut is valid!")
    print(output.model_dump_json(indent=2))
except Exception as e:
    print("❌ Output schema failed:", e)
