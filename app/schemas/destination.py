from pydantic import BaseModel
from typing import List, Optional

class Coordinates(BaseModel):
    lat: float
    lng: float
#base model stores common attribute shareed by multiple requests and response
class DestinationBase(BaseModel):
    name: str
    description: Optional[str]
    tags: List[str] = []
    region: Optional[str]
    photos: Optional[List[str]]
    coordinates: Optional[Coordinates]

#Schema for creating a new destination: inherits all fields from DestinationBase
class DestinationCreate(DestinationBase):
    pass
#Schema for API response: includes all destination fields + MongoDB's ID as a string
class DestinationOut(DestinationBase):
    id: str
