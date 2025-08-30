import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from app.utils.security import hash_password
from dotenv import load_dotenv


load_dotenv(override=True)

MONGO_URI = os.getenv("MONGO_URI")
db_name = os.getenv("DB_NAME", "travel_db")  

async def seed_admins():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[db_name]

    admins = [
        {
            "name": "Tenzing Norway Sherpa",
            "email": "tenzn@example.com",
            "password": hash_password("adminpass1"),
            "role": "admin",
            "age": 30,
            "nationality": "Nepal",
            "travelStyle": "Adventure",
            "preferences": ["mountains", "history"]
        },
        {
            "name": "Edmund Hillary",
            "email": "edmudh@example.com",
            "password": hash_password("adminpass2"),
            "role": "admin",
            "age": 35,
            "nationality": "New Zealand",
            "travelStyle": "Relaxed",
            "preferences": ["beach", "culture"]
        },
        {
            "name": "Pasang Lhamu Sherpa",
            "email": "pasang@example.com",
            "password": hash_password("adminpass3"),
            "role": "admin",
            "age": 28,
            "nationality": "Nepal",
            "travelStyle": "Backpacking",
            "preferences": ["trekking", "wildlife"]
        }
    ]

    for admin in admins:
        existing_admin = await db["users"].find_one({"email": admin["email"]})
        if existing_admin:
            print(f"Admin with email {admin['email']} already exists")
        else:
            await db["users"].insert_one(admin)
            print(f"Admin {admin['email']} seeded successfully")

asyncio.run(seed_admins())
