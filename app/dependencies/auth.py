from fastapi import Depends, HTTPException
from jose import jwt, JWTError
from app.utils.jwt import SECRET_KEY, ALGORITHM
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials


oauth2_scheme = HTTPBearer()

async def get_current_user(token: HTTPAuthorizationCredentials = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        print("Decoded JWT Payload:", payload)
        return payload  # contains 'id' and 'role'
    except JWTError as e:
        print("JWT decode error:", e)
        raise HTTPException(status_code=401, detail="Invalid token")

async def require_admin(user: dict = Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")

