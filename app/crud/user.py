from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from app.schemas.user import UserCreate

# Create
async def create_user(db: AsyncIOMotorDatabase, data: UserCreate) -> str:
    result = await db["users"].insert_one(data.dict())
    return str(result.inserted_id)

# Read All
async def get_all_users(db: AsyncIOMotorDatabase) -> List[dict]:
    cursor = db["users"].find()
    users = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
        users.append(doc)
    return users

# Read One by ID
async def get_user_by_id(db: AsyncIOMotorDatabase, id: str) -> dict:
    doc = await db["users"].find_one({"_id": ObjectId(id)})
    if doc:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
    return doc

# Update by ID
async def update_user(db: AsyncIOMotorDatabase, id: str, data: UserCreate) -> bool:
    result = await db["users"].update_one(
        {"_id": ObjectId(id)},
        {"$set": data.dict()}
    )
    return result.modified_count == 1

# Delete by ID
async def delete_user(db: AsyncIOMotorDatabase, id: str) -> bool:
    result = await db["users"].delete_one({"_id": ObjectId(id)})
    return result.deleted_count == 1
