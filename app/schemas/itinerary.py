from pydantic import BaseModel
from typing import List, Optional, Dict
from typing_extensions import Literal
from datetime import datetime



class DayEntry(BaseModel):
    day: int
    destinations: List[str]  # List of destination IDs (as strings)

class EmergencyContact(BaseModel):
    tel: str
    email: str

class ItineraryBase(BaseModel):
    user_id: str
    title: str
    duration_days: int
    difficulty: Literal['beginner', 'easy', 'friendly','moderate', 'intermediate','moderate', 'intermediate',"Beginner-friendly","Easy", "Moderate", "Challenging"]
    days: List[DayEntry]  # Multiple days, each with multiple destinations
    max_elevation_m: Optional[int] = None
    budget_estimate: Optional[str] = None
    
    permit_required_nepali: Optional[bool] = None
    permit_fee_npr: Optional[int] = None
    rating: Optional[float] = None
    emergency_contacts: Optional[Dict[str, EmergencyContact]] = None

# Schema for creating a new itinerary (used for POST requests)
# Inherits fields from ItineraryBase: user_id, title, days[]
class ItineraryCreate(ItineraryBase):
    pass  

# Schema for sending itinerary data in responses (used for GET requests)
# Includes all base fields + the unique MongoDB document ID
class ItineraryOut(ItineraryBase):
    id: str
class ItineraryByTitle(ItineraryBase):
    title : str

