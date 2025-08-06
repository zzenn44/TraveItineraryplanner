from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime

from app.schemas.location import LocationMetadataCreate

# Create
async def create_location(db: AsyncIOMotorDatabase, data: LocationMetadataCreate) -> str:
    doc = data.dict()
    doc["createdAt"] = datetime.utcnow()
    result = await db["location_metadata"].insert_one(doc)
    print("Inserted location metadata:", doc)
    return str(result.inserted_id)

# Read All
async def get_all_locations(db: AsyncIOMotorDatabase) -> List[dict]:
    cursor = db["location_metadata"].find()
    locations = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
        locations.append(doc)
    return locations

# Read One by ID
async def get_location_by_id(db: AsyncIOMotorDatabase, id: str) -> Optional[dict]:
    doc = await db["location_metadata"].find_one({"_id": ObjectId(id)})
    if doc:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
    return doc

# Update by ID
async def update_location(db: AsyncIOMotorDatabase, id: str, data: LocationMetadataCreate) -> bool:
    result = await db["location_metadata"].update_one(
        {"_id": ObjectId(id)},
        {"$set": data.dict()}
    )
    return result.modified_count == 1

# Delete by ID
async def delete_location(db: AsyncIOMotorDatabase, id: str) -> bool:
    result = await db["location_metadata"].delete_one({"_id": ObjectId(id)})
    return result.deleted_count == 1
