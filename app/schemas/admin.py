from pydantic import BaseModel, EmailStr
from typing import Literal, Optional
from datetime import datetime


class AdminBase(BaseModel):
    name: str
    email: EmailStr
    role: Literal["admin", "agent"]
    created_at: datetime

#  When creating a new admin user (e.g., during registration or DB seed)
class AdminCreate(AdminBase):
    password: str  # Plain password during creation

#  For internal DB record / use later
class AdminInDB(AdminBase):
    password_hash: str  # Only hashed version stored

#  For sending admin data back in API responses
class AdminOut(AdminBase):
    id: str
