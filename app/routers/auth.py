from fastapi import APIRouter, Depends, HTTPException
from app.utils.jwt import create_access_token
from app.utils.security import verify_password
from app.database import get_database
from app.schemas.auth import UserLogin
from bson import ObjectId
from app.schemas.user import UserCreate  # add this import
from app.utils.security import hash_password


router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def login(credentials: UserLogin, db = Depends(get_database)):
    user = await db["users"].find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"id": str(user["_id"]), "role": user["role"]})
    return {"access_token": token}

@router.post("/register")
async def register(user: UserCreate, db = Depends(get_database)):
    existing = await db["users"].find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    user_dict = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "age": user.age,
        "nationality": user.nationality,
        "travelStyle": user.travelStyle,
        "preferences": user.preferences,
        "role": user.role if user.role else "user"
    }

    result = await db["users"].insert_one(user_dict)  
    return {"message": "User registered", "user_id": str(result.inserted_id)}