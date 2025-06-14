import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

async def test_connection():
    try:
        client = AsyncIOMotorClient(MONGO_URI)
        db = client.get_default_database()
        result = await db.command("ping")
        print(" Pinged MongoDB! Connection successful.")
        print("Default database:", db.name)
    except Exception as e:
        print(" Connection failed:", e)

# Run the async function
asyncio.run(test_connection())

