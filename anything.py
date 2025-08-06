# from motor.motor_asyncio import AsyncIOMotorClient
# import os
# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi

# MONGO_URI = "mongodb+srv://078csit009jenisha:fDTiqPs13h7L4GRW@cluster0.olpnh0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# # Create a new client and connect to the server
# # client = MongoClient(uri, server_api=ServerApi('1'))
# client = AsyncIOMotorClient(MONGO_URI)

# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# from app.utils.security import hash_password
# print(hash_password("test1234"))


from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, ConnectionFailure
from bson.objectid import ObjectId
from pprint import pprint
import sys

# MongoDB Atlas connection string
MONGO_URI = 'mongodb+srv://078csit009jenisha:fDTiqPs13h7L4GRW@cluster0.olpnh0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
client = None

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=10000)
    client.admin.command('ping')
    print("✅ MongoDB connection successful!")

    # --- Application logic ---
    db = client.travel_db
    users_collection = db.users
    itineraries_collection = db.itinerary  # Note: check if the collection is really named 'itinerary'

    user_id_to_fetch = ObjectId("68667f70c2e3b39892af8675")
    user_document = users_collection.find_one({"_id": user_id_to_fetch})

    if user_document:
        print(f"\n👤 Found user: {user_document.get('name') or user_document.get('fullname', 'N/A')}")
        saved_itinerary_ids = user_document.get("saved_itineraries", [])

        if saved_itinerary_ids:
            print("\n📌 Saved Itinerary Details:")
            corresponding_itineraries = itineraries_collection.find({
                "_id": {"$in": saved_itinerary_ids}
            })

            found = False
            for itinerary in corresponding_itineraries:
                found = True
                print(f"\n🗺️ Title: {itinerary.get('title', 'N/A')}")
                print(f"📆 Duration: {itinerary.get('duration_days', 'N/A')} days")
                print(f"📈 Max Elevation: {itinerary.get('max_elevation_m', 'N/A')} m")
                print(f"🧗 Difficulty: {itinerary.get('difficulty', 'N/A')}")
                print(f"⭐ Rating: {itinerary.get('rating', 'N/A')}")
                print(f"💰 Budget Estimate: {itinerary.get('budget_estimate', 'N/A')}")
                permit_required = itinerary.get("permit_required_nepali", None)
                if permit_required is not None:
                    print(f"🪪 Permit Required (Nepali): {'Yes' if permit_required else 'No'}")

                days = itinerary.get("days", [])
                if days:
                    print(f"🗓️ Days: {len(days)} day(s)")
                print(f"🕒 Created At: {itinerary.get('createdAt', 'N/A')}")
                print("-" * 40)

            if not found:
                print("⚠️ No matching itineraries found in the `itineraries` collection.")
        else:
            print("ℹ️ This user has no saved itineraries.")
    else:
        print(f"❌ User with ID {user_id_to_fetch} not found.")

except ServerSelectionTimeoutError as err:
    print(f"❌ MongoDB connection FAILED: Timeout.\nError: {err}", file=sys.stderr)
    sys.exit(1)
except ConnectionFailure as err:
    print(f"❌ MongoDB connection FAILED: Network error.\nError: {err}", file=sys.stderr)
    sys.exit(1)
except Exception as err:
    print(f"❌ Unexpected error: {err}", file=sys.stderr)
    sys.exit(1)
finally:
    if client:
        client.close()
        print("\n🔌 MongoDB client connection closed.")
