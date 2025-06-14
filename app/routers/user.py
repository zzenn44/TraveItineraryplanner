from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List

from app.schemas.user import UserCreate, UserOut
from app.database import get_database
from app.crud import user as crud

router = APIRouter(prefix="/users", tags=["users"])

# Create
@router.post("/", response_model=str)
async def create_user(
    user: UserCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    return await crud.create_user(db, user)

# Read all
@router.get("/", response_model=List[UserOut])
async def get_all_users(db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.get_all_users(db)

# Read one by ID
@router.get("/{id}", response_model=UserOut)
async def get_user(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.get_user_by_id(db, id)

# Update by ID
@router.put("/{id}", response_model=bool)
async def update_user(
    id: str,
    user: UserCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    return await crud.update_user(db, id, user)

# Delete by ID
@router.delete("/{id}", response_model=bool)
async def delete_user(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.delete_user(db, id)
