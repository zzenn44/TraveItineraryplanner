from pydantic import BaseModel
from typing import Literal
from datetime import datetime


class InteractionBase(BaseModel):
    user_id: str            
    destination_id: str     
    action: Literal["view", "like", "book"]  
    timestamp: datetime      


class InteractionCreate(InteractionBase):
    pass


class InteractionOut(InteractionBase):
    id: str  
