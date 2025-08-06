from fastapi import FastAPI
from app.routers import destination
from app.routers import itinerary
from app.routers import user
from fastapi.middleware.cors import CORSMiddleware
from app.routers import admin
from app.routers import auth  
from app.routers import users_saved_itineraries
# from app.routers import recommend  
from app.routers import recommendation
from app.Model.poi_recommendation_model import POIRecommendationModel
import pickle
import sys




app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins= ["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
   
)


app.include_router(destination.router)
app.include_router(itinerary.router)
app.include_router(user.router)
app.include_router(admin.router)
app.include_router(auth.router)
app.include_router(users_saved_itineraries.router)
# app.include_router(recommend.router)
app.include_router(recommendation.router)


@app.get("/")
async def root():
    return {"message": "FastAPI backend is running!"}

#@app.get("/")
#def read_root():
    #return {"message": "Hello, FastAPI!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)