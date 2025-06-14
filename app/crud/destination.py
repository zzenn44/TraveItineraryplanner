from typing import List
from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from app.schemas.destination import DestinationCreate

# Create
async def create_destination(db: AsyncIOMotorDatabase, data: DestinationCreate) -> str:
    result = await db["destination"].insert_one(data.dict())
    return str(result.inserted_id)

# Read All
async def get_all_destinations(db: AsyncIOMotorDatabase) -> List[dict]:
    cursor = db["destination"].find()
    destinations = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
        destinations.append(doc)
    return destinations

# Read One by ID 
async def get_destination_by_id(db: AsyncIOMotorDatabase, id: str) -> dict:
    doc = await db["destination"].find_one({"_id": ObjectId(id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Destination not found")
    doc["id"] = str(doc["_id"])
    doc.pop("_id")
    return doc

# Update by ID
async def update_destination(db: AsyncIOMotorDatabase, id: str, data: DestinationCreate) -> bool:
    result = await db["destination"].update_one(
        {"_id": ObjectId(id)},
        {"$set": data.dict()}
    )
    print("Matched:", result.matched_count, "Modified:", result.modified_count)
    return result.modified_count == 1

# Delete by ID
async def delete_destination(db: AsyncIOMotorDatabase, id: str) -> bool:
    result = await db["destination"].delete_one({"_id": ObjectId(id)})
    return result.deleted_count == 1
