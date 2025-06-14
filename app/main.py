from fastapi import FastAPI
from app.routers import destination
from app.routers import itinerary
from app.routers import user



app = FastAPI()
app.include_router(destination.router)
app.include_router(itinerary.router)
app.include_router(user.router)

@app.get("/")
def root():
    return {"message": "FastAPI backend is running!"}

#@app.get("/")
#def read_root():
    #return {"message": "Hello, FastAPI!"}
