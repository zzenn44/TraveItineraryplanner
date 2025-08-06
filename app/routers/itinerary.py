# from fastapi import APIRouter, Depends
# from typing import List
# from motor.motor_asyncio import AsyncIOMotorDatabase
# from fastapi import HTTPException
# from app.schemas.itinerary import ItineraryCreate, ItineraryOut , ItineraryByTitle
# from app.database import get_database
# from app.crud import itinerary as crud
# import re
# from bson import ObjectId
# from app.database import get_database


# router = APIRouter(prefix="/itineraries", tags=["itineraries"])

# # Create
# @router.post("/", response_model=str)
# async def create_itinerary(
#     itinerary: ItineraryCreate,
#     db: AsyncIOMotorDatabase = Depends(get_database)
# ):
#     return await crud.create_itinerary(db, itinerary)

# # Read all
# @router.get("/", response_model=List[ItineraryOut])
# async def get_all(db: AsyncIOMotorDatabase = Depends(get_database)):
#     return await crud.get_all_itineraries(db)

# # Read one
# @router.get("/{id}", response_model=ItineraryOut)
# async def get_one(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
#     return await crud.get_itinerary_by_id(db, id)

# #title match
# # ✅ Get itinerary by MongoDB ObjectId with transformed fields
# @router.get("/{itinerary_id}")
# async def get_itinerary_by_id(itinerary_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
#     try:
#         obj_id = ObjectId(itinerary_id)
#     except Exception:
#         raise HTTPException(status_code=400, detail="Invalid itinerary ID")

#     itinerary = await db["itineraries"].find_one({"_id": obj_id})
#     if not itinerary:
#         raise HTTPException(status_code=404, detail="Itinerary not found")

#     # ✅ Transform for frontend compatibility
#     response = {
#         "_id": str(itinerary["_id"]),
#         "title": itinerary.get("title"),
#         "overview": itinerary.get("overview", "Overview coming soon."),
#         "duration": itinerary.get("duration_days"),
#         "difficulty": itinerary.get("difficulty"),
#         "elevation": itinerary.get("max_elevation_m"),
#         "cost": itinerary.get("budget_estimate"),
#         "days": itinerary.get("days", []),
#         "includes": itinerary.get("includes", []),
#         "excludes": itinerary.get("excludes", []),
#         "personalizedTips": itinerary.get("personalizedTips", [])
#     }

#     return response


# # Update
# @router.put("/{id}", response_model=bool)
# async def update_itinerary(
#     id: str,
#     itinerary: ItineraryCreate,
#     db: AsyncIOMotorDatabase = Depends(get_database)
# ):
#     return await crud.update_itinerary(db, id, itinerary)

# # Delete
# @router.delete("/{id}", response_model=bool)
# async def delete_itinerary(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
#     return await crud.delete_itinerary(db, id)


# # this ia added at the last 
# @router.get("/detailed/{title}", response_model=dict)
# async def get_detailed_itinerary_by_title(
#     title: str, 
#     db: AsyncIOMotorDatabase = Depends(get_database)
# ):
#     """Get itinerary with full destination details populated"""
#     from app.crud import destination as dest_crud
    
#     # Get the itinerary
#     itinerary = await crud.get_itinerary_by_title(db, title)
#     if not itinerary:
#         raise HTTPException(status_code=404, detail="Itinerary not found")
    
#     # Convert to dict for manipulation
#     itinerary_dict = itinerary.dict()
    
#     # Populate destination details for each day
#     for day_entry in itinerary_dict["days"]:
#         destination_details = []
#         for dest_id in day_entry["destinations"]:
#             try:
#                 dest = await dest_crud.get_destination_by_id(db, dest_id)
#                 if dest:
#                     destination_details.append(dest.dict())
#             except:
#                 # If destination not found, skip it
#                 continue
#         day_entry["destination_details"] = destination_details
    
#     return itinerary_dict

# @router.get("/slug/{slug}", response_model=ItineraryByTitle)
# async def get_by_slug(slug: str, db: AsyncIOMotorDatabase = Depends(get_database)):
#     """Get itinerary by URL-friendly slug (e.g., 'helambu-trek')"""
#     # Convert slug to title format
#     title = slug.replace('-', ' ').title()
    
#     itinerary = await crud.get_itinerary_by_title(db, title)
#     if not itinerary:
#         raise HTTPException(status_code=404, detail="Itinerary not found")
    
#     return itinerary


from fastapi import APIRouter, Depends, HTTPException
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from app.schemas.itinerary import ItineraryCreate, ItineraryOut, ItineraryByTitle
from app.database import get_database
from app.crud import itinerary as crud
import re

router = APIRouter(prefix="/itineraries", tags=["itineraries"])

# Create itinerary
@router.post("/", response_model=str)
async def create_itinerary(itinerary: ItineraryCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.create_itinerary(db, itinerary)

# Get all itineraries
@router.get("/", response_model=List[ItineraryOut])
async def get_all(db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.get_all_itineraries(db)

@router.get("/{itinerary_id}")
async def get_itinerary_by_id(itinerary_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    try:
        obj_id = ObjectId(itinerary_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid itinerary ID")

    itinerary = await db["itinerary"].find_one({"_id": obj_id})
    if not itinerary:
        raise HTTPException(status_code=404, detail="Itinerary not found")

    return {
        "_id": str(itinerary["_id"]),
        "title": itinerary.get("title"),
        "overview": itinerary.get("overview", "Overview coming soon."),
        "duration": itinerary.get("duration_days"),
        "difficulty": itinerary.get("difficulty"),
        "elevation": itinerary.get("max_elevation_m"),
        "cost": itinerary.get("budget_estimate"),
        "days": itinerary.get("days", []),
        "includes": itinerary.get("includes", []),
        "excludes": itinerary.get("excludes", []),
        "personalizedTips": itinerary.get("personalizedTips", [])
    }

# Update itinerary
@router.put("/{id}", response_model=bool)
async def update_itinerary(id: str, itinerary: ItineraryCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.update_itinerary(db, id, itinerary)

# Delete itinerary
@router.delete("/{id}", response_model=bool)
async def delete_itinerary(id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    return await crud.delete_itinerary(db, id)

async def get_itinerary_by_id(itinerary_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    try:
        obj_id = ObjectId(itinerary_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid itinerary ID")

    itinerary = await db["itinerary"].find_one({"_id": obj_id})
    if not itinerary:
        raise HTTPException(status_code=404, detail="Itinerary not found")

    return {
        "_id": str(itinerary["_id"]),
        "title": itinerary.get("title"),
        "overview": itinerary.get("overview", "Overview coming soon."),
        "duration": itinerary.get("duration_days"),
        "difficulty": itinerary.get("difficulty"),
        "elevation": itinerary.get("max_elevation_m"),
        "cost": itinerary.get("budget_estimate"),
        "days": itinerary.get("days", []),
        "includes": itinerary.get("includes", []),
        "excludes": itinerary.get("excludes", []),
        "personalizedTips": itinerary.get("personalizedTips", [])
    }
# Get itinerary by slug
@router.get("/slug/{slug}", response_model=ItineraryByTitle)
async def get_by_slug(slug: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    title = slug.replace('-', ' ').title()
    itinerary = await crud.get_itinerary_by_title(db, title)
    if not itinerary:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    return itinerary
