from fastapi import APIRouter, Depends, HTTPException
from app.dependencies.auth import require_admin
from app.database import get_database
from app.crud import user as crud

router = APIRouter(prefix="/admin", tags=["admin"])

# Existing example
@router.get("/dashboard")
async def admin_dashboard(dep=Depends(require_admin)):
    return {"message": "Welcome Admin!"}

# Promote user to admin
@router.put("/promote/{user_id}")
async def promote_to_admin(user_id: str, db=Depends(get_database), dep=Depends(require_admin)):
    success = await crud.promote_user_to_admin(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found or already admin")
    return {"message": "User promoted to admin"}

