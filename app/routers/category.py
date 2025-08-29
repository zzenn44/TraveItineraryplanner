from fastapi import APIRouter, HTTPException, Depends
from app.database import get_database
from typing import List
from bson import ObjectId
import re

router = APIRouter(
    prefix="/category",
    tags=["category"]
)

def serialize_itinerary(itinerary: dict) -> dict:
    itinerary["_id"] = str(itinerary["_id"])
    return itinerary

@router.get("/{category_name}", response_model=List[dict])
async def get_itineraries_by_category(category_name: str, db=Depends(get_database)):
    try:

        regex_pattern = re.compile(f"^{re.escape(category_name)}$", re.IGNORECASE)

        itineraries = await db["itinerary"].find({"category": regex_pattern}).to_list(length=1000)

        if not itineraries:
            raise HTTPException(status_code=404, detail=f"No itineraries found for category '{category_name}'")

        serialized = [serialize_itinerary(it) for it in itineraries]
        return serialized

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))