from pydantic import BaseModel
from typing import Optional

class LocationMetadataBase(BaseModel):
    destination_id: str  # Foreign key (string ID of Destination)
    altitude: Optional[float]  # meters
    climate: Optional[str]     # e.g., "temperate", "alpine"
    timezone: Optional[str]    # e.g., "Asia/Kathmandu"
    region: Optional[str]      # e.g., "Bagmati", "Gandaki"
    terrain_type: Optional[str]  # e.g., "mountain", "valley"

class LocationMetadataCreate(LocationMetadataBase):
    pass

class LocationMetadataOut(LocationMetadataBase):
    id: str  