import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime,timezone
from dotenv import load_dotenv
import os

# Your scraped data
from destination_scraper import destination_list 

load_dotenv(override=True)
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["travel_db"]

async def insert_destinations():
    count = 0
    await db.destination.create_index("name", unique=True)  
    
    for dest in destination_list:
        if not isinstance(dest, dict):
            print(f"Skipped (already exists): {dest['name']}")
            continue
        dest["createdAt"] = datetime.now(timezone.utc)  
        result = await db.destination.replace_one(  
            {"name": dest["name"]},
            dest,
            upsert=True
        )
        count += 1
        print(f"[{count}] Inserted: {dest['name']}")

    print(f"Total new destinations inserted: {count}")

if __name__ == "__main__":
    asyncio.run(insert_destinations())
