from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List

from app.schemas.location import LocationMetadataCreate, LocationMetadataOut
from app.database import get_database
from app.crud import location as crud

router = APIRouter(prefix="/location_metadata", tags=["location_metadata"])

# Create
@router.post("/", response_model=str)
async def create_location(
    location: LocationMetadataCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    return await crud.create_location(db, location)

# Read all
@router.get("/", response_model=List[LocationMetadataOut])
async def get_all_locations(db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.get_all_locations(db)

# Read one by ID
@router.get("/{id}", response_model=LocationMetadataOut)
async def get_location(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.get_location_by_id(db, id)

# Update by ID
@router.put("/{id}", response_model=bool)
async def update_location(
    id: str,
    location: LocationMetadataCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    return await crud.update_location(db, id, location)

# Delete by ID
@router.delete("/{id}", response_model=bool)
async def delete_location(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.delete_location(db, id)
