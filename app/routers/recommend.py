# from fastapi import APIRouter, Depends
# from bson import ObjectId
# from app.database import get_database

# router = APIRouter(prefix="/recommend", tags=["recommendations"])

# @router.post("/{user_id}")
# async def recommend_itineraries(user_id: str, db=Depends(get_database)):
#     # Simulated dummy recommendation data
#     dummy_itineraries = [
#         {
#             "_id": "64a1f0e4b7b8cd1a3f0a1234",
#             "title": "Phoksundo Lake Trek",
#             "duration_days": 9,
#             "difficulty": "Moderate",
#             "rating": 4.8
#         },
#         {
#             "_id": "64a1f0e4b7b8cd1a3f0a5678",
#             "title": "Mardi Himal Trek",
#             "duration_days": 5,
#             "difficulty": "Easy",
#             "rating": 4.6
#         }
#     ]
#     return dummy_itineraries
