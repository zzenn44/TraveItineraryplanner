from pydantic import BaseModel
from typing import Literal
from datetime import datetime


class InteractionBase(BaseModel):
    user_id: str            
    destination_id: str     
    action: Literal["view", "like", "book"]  
    timestamp: datetime      

# Schema for inserting new interaction
class InteractionCreate(InteractionBase):
    pass

#Schema for returning interaction from DB
class InteractionOut(InteractionBase):
    id: str  
