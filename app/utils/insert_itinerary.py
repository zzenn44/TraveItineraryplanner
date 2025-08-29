import asyncio
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

from itinerary_importer import itinerary_list

# Load .env and Mongo URI
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["travel_db"]

async def seed_itineraries():
    count = 0
    for itinerary in itinerary_list:
        itinerary["updatedAt"] = datetime.now(timezone.utc)

        result = await db.itinerary.replace_one(
            {"title": itinerary["title"]},  
            itinerary,
            upsert=True  
        )

        if result.matched_count > 0:
            print(f"[UPDATED] {itinerary['title']}")
        else:
            print(f"[INSERTED] {itinerary['title']}")
            count += 1

    print(f"\n Total new itineraries inserted: {count}")

if __name__ == "__main__":
    asyncio.run(seed_itineraries())
