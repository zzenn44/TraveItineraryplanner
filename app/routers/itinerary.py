from fastapi import APIRouter, Depends
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.itinerary import ItineraryCreate, ItineraryOut
from app.database import get_database
from app.crud import itinerary as crud

router = APIRouter(prefix="/itineraries", tags=["itineraries"])

# Create
@router.post("/", response_model=str)
async def create_itinerary(
    itinerary: ItineraryCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    return await crud.create_itinerary(db, itinerary)

# Read all
@router.get("/", response_model=List[ItineraryOut])
async def get_all(db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.get_all_itineraries(db)

# Read one
@router.get("/{id}", response_model=ItineraryOut)
async def get_one(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.get_itinerary_by_id(db, id)

# Update
@router.put("/{id}", response_model=bool)
async def update_itinerary(
    id: str,
    itinerary: ItineraryCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    return await crud.update_itinerary(db, id, itinerary)

# Delete
@router.delete("/{id}", response_model=bool)
async def delete_itinerary(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.delete_itinerary(db, id)


