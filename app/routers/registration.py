from fastapi import APIRouter, HTTPException, Depends
from app.schemas.auth import UserRegister
from app.utils.security import hash_password
from app.database import get_database
from fastapi import HTTPException

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
async def register(user: UserRegister, db = Depends(get_database)):
    errors = []

    if user.password != user.confirm_password:
        errors.append({"loc": ["body", "confirm_password"], "msg": "Passwords do not match", "type": "value_error"})

    existing_user = await db["users"].find_one({"email": user.email})
    if existing_user:
        errors.append({"loc": ["body", "email"], "msg": "Email already registered", "type": "value_error"})

    if errors:
        raise HTTPException(status_code=422, detail=errors)

    hashed_pw = hash_password(user.password)

    user_dict = {
        "fullname": user.fullname,
        "email": user.email,
        "password": hashed_pw,
        "role": "user"
    }

    result = await db["users"].insert_one(user_dict)
    return {"message": "User registered successfully", "user_id": str(result.inserted_id)}

raise HTTPException(status_code=422, detail=[
    {"loc": ["body", "email"], "msg": "Email already registered", "type": "value_error"},
    {"loc": ["body", "confirm_password"], "msg": "Passwords do not match", "type": "value_error"}
])