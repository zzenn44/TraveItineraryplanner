from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr
    age: Optional[int]
    nationality: Optional[str]
    travelStyle: Optional[str]  
    preferences: Optional[List[str]] 
    role: str = "user" 

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str
    fullname: Optional[str] = None
    email: str
    saved_itineraries: Optional[List[str]] = []