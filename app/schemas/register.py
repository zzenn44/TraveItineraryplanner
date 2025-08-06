from pydantic import BaseModel, EmailStr, Field

class UserRegister(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    confirm_password: str
