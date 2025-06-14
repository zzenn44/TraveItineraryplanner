import sys
import os
from pydantic import ValidationError

# Add app/ to path so imports work
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from schemas.user import UserCreate  # now it should work

try:
    user = UserCreate(
        name="Abhisek",
        email="abhisek@example.com",
        age=22,
        nationality="Nepalese",
        travelStyle="solo",
        preferences=["nature", "culture"]
    )
    print("UserCreate is valid!")
    print(user.json())
except ValidationError as e:
    print("Validation failed:")
    print(e)
