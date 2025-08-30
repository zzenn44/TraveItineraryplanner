from fastapi import APIRouter, Depends, HTTPException
from app.dependencies.auth import require_admin
from app.database import get_database
from app.crud import user as crud
from motor.motor_asyncio import AsyncIOMotorDatabase


router = APIRouter(prefix="/admin", tags=["admin"])
 
@router.get("/stats", dependencies=[Depends(require_admin)])
async def admin_stats(db: AsyncIOMotorDatabase = Depends(get_database)):
    users_c = await db["users"].count_documents({})
    dest_c  = await db["destination"].count_documents({})
    loc_c   = await db["location_metadata"].count_documents({})
    itin_c  = await db["itinerary"].count_documents({})

    return {
        "users": users_c,
        "destinations": dest_c,
        "locations": loc_c,
        "itineraries": itin_c,
    }


@router.get("/dashboard")
async def admin_dashboard(dep=Depends(require_admin)):
    return {"message": "Welcome Admin!"}


@router.put("/promote/{user_id}")
async def promote_to_admin(user_id: str, db=Depends(get_database), dep=Depends(require_admin)):
    success = await crud.promote_user_to_admin(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found or already admin")
    return {"message": "User promoted to admin"}

