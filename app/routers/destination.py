from fastapi import APIRouter, Depends
from app.schemas.destination import DestinationCreate, DestinationOut
from app.database import get_database
from app.crud import destination as crud
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List

router = APIRouter(prefix="/destinations", tags=["destinations"])

# Create
@router.post("/", response_model=str)
async def create_dest(
    dest: DestinationCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    return await crud.create_destination(db, dest)

# Read all
@router.get("/", response_model=List[DestinationOut])
async def get_all(db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.get_all_destinations(db)

# Read one
@router.get("/{id}", response_model=DestinationOut)
async def get_one(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.get_destination_by_id(db, id)

# Update
@router.put("/{id}", response_model=bool)
async def update_destination(
    id: str,
    dest: DestinationCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    return await crud.update_destination(db, id, dest)

# Delete
@router.delete("/{id}", response_model=bool)
async def delete_destination(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.delete_destination(db, id)
