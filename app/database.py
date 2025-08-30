from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from motor.motor_asyncio import AsyncIOMotorClient
import os
   
from dotenv import load_dotenv
load_dotenv()  

MONGO_URL = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URL)

db = client["travel_db"]

def get_database():
    return db


