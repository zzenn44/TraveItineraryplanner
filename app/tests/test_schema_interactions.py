import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from schemas.interactions import InteractionCreate
from datetime import datetime


sample_data = {
    "user_id": "user789",
    "destination_id": "dest321",
    "action": "like",
    "timestamp": datetime.utcnow()
}


try:
    interaction = InteractionCreate(**sample_data)
    print("InteractionCreate is valid!")
    print(interaction.model_dump_json(indent=2))
except Exception as e:
    print("Validation failed:", e)
