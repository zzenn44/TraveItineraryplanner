from pydantic import BaseModel, Field
from typing import Optional

class RatingBase(BaseModel):
    user_id: str
    destination_id: str
    rating: int = Field(..., ge=1, le=5)  # Must be between 1–5
    review: Optional[str]

# Schema for creating a new itinerary (used for POST requests)
# Inherits fields from ItineraryBase: user_id, title, days[]
class RatingCreate(RatingBase):
    pass

# Schema for sending itinerary data in responses (used for GET requests)
# Includes all base fields + the unique MongoDB document ID
class RatingOut(RatingBase):
    id: str
