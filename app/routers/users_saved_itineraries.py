from fastapi import APIRouter, Depends, HTTPException
from app.database import get_database
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(prefix="/saved", tags=["saved-itineraries"])


@router.post("/add/{user_id}/{itinerary_id}")
async def add_itinerary_to_saved(user_id: str, itinerary_id: str, db=Depends(get_database)):
    try:
        user_obj_id = ObjectId(user_id)
        itinerary_obj_id = ObjectId(itinerary_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid ObjectId format.")

    result = await db["users"].update_one(
        {"_id": user_obj_id},
        {"$addToSet": {"saved_itineraries": itinerary_obj_id}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Itinerary added to saved list."}



@router.delete("/remove/{user_id}/{itinerary_id}")
async def remove_saved_itinerary(user_id: str, itinerary_id: str, db=Depends(get_database)):
    try:
        user_obj_id = ObjectId(user_id)
        itinerary_obj_id = ObjectId(itinerary_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid ObjectId format.")

    result = await db["users"].update_one(
        {"_id": user_obj_id},
        {"$pull": {"saved_itineraries": itinerary_obj_id}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Itinerary removed from saved list."}




@router.get("/{user_id}")
async def get_saved_itineraries(user_id: str, db=Depends(get_database)):
    try:
        user_obj_id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid ObjectId format.")

    user = await db["users"].find_one({"_id": user_obj_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    itinerary_ids = user.get("saved_itineraries", [])
    if not itinerary_ids:
        return {"message": "User has no saved itineraries", "itineraries": []}

    try:
        object_ids = [ObjectId(id) for id in itinerary_ids]
    except InvalidId:
        raise HTTPException(status_code=400, detail="One or more saved itinerary IDs are invalid")

    itineraries_cursor = db["itinerary"].find({"_id": {"$in": object_ids}})
    itineraries = []

    async for itinerary in itineraries_cursor:
        itineraries.append({
             "id": str(itinerary.get("_id")),
            "title": itinerary.get("title", "N/A"),
            "duration_days": itinerary.get("duration_days", "N/A"),
            "max_elevation_m": itinerary.get("max_elevation_m", "N/A"),
            "difficulty": itinerary.get("difficulty", "N/A"),
            "rating": itinerary.get("rating", "N/A"),
            "budget_estimate": itinerary.get("budget_estimate", "N/A"),
            "permit_required_nepali": itinerary.get("permit_required_nepali", False),
            "days_count": len(itinerary.get("days", [])),
            "days": itinerary.get("days", []),
            "created_at": itinerary.get("createdAt", None)
        })

    return {
        "user_id": user_id,
        "saved_count": len(itineraries),
        "itineraries": itineraries
    }
