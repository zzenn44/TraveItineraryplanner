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

async def insert_itineraries():
    count = 0
    for itinerary in itinerary_list:
        existing = await db.itinerary.find_one({"title": itinerary["title"]})
        if existing:
            print(f"Skipped (already exists): {itinerary['title']}")
            continue

        itinerary["createdAt"] = datetime.now(timezone.utc)
        result = await db.itinerary.insert_one(itinerary)
        count += 1
        print(f"[{count}] Inserted: {itinerary['title']}")

    print(f"Total new itineraries inserted: {count}")

if __name__ == "__main__":
    asyncio.run(insert_itineraries())

