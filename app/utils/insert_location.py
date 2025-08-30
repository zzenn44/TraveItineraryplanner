import asyncio
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pydantic import ValidationError
from app.schemas.location import LocationMetadataCreate  
from app.utils.location_importer import location_metadata_list  


load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["travel_db"]

async def insert_locations():
    await db.location_metadata.create_index("destination_id", unique=True)
    count = 0
    for loc in location_metadata_list:
        try:
           
            validated = LocationMetadataCreate(**loc)
        except ValidationError as e:
            print(f" Validation error for {loc.get('destination_id')}: {e}")
            continue

       
        existing = await db.location_metadata.find_one({"destination_id": validated.destination_id})
        if existing:
            print(f"Skipped (already exists): {validated.destination_id}")
            continue
     
        loc["createdAt"] = datetime.now(timezone.utc)
        result = await db.location_metadata.replace_one(
            {"destination_id": validated.destination_id},
            loc,
            upsert=True
        )
        count += 1
        print(f"[{count}] Inserted: {validated.destination_id}")

    print(f"\n Total new locations inserted: {count}")

if __name__ == "__main__":
    asyncio.run(insert_locations())
