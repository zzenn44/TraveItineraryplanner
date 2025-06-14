from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr
    age: Optional[int]
    nationality: Optional[str]
    travelStyle: Optional[str]  
    preferences: Optional[List[str]] 

class UserCreate(UserBase):
    pass

class UserOut(UserBase):
    id: str
