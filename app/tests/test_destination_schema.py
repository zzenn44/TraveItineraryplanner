import sys
import os
from pydantic import ValidationError


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.schemas.destination import DestinationCreate

try:
    destination = DestinationCreate(
        name="Pokhara",
        description="A scenic lakeside city",
        tags=["nature", "lakeside", "relaxation"],
        region="Gandaki",
        photos=["https://example.com/photo1.jpg"],
        coordinates={"lat": 28.2096, "lng": 83.9856}
    )
    print(" DestinationCreate is valid!")
    print(destination.model_dump_json(indent=2))

except ValidationError as e:
    print(" Validation failed:")
    print(e)
