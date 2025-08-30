import os
import sys
import pickle
from pathlib import Path
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

import __main__
from app.Model.poi_recommendation_model import POIRecommendationModel
from app.database import get_database
from bson import ObjectId

setattr(__main__, "POIRecommendationModel", POIRecommendationModel)

router = APIRouter()
try:
    model = POIRecommendationModel()
    with open("app/Model/poi_model.pkl", "rb") as f:
        model = pickle.load(f)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit("Failed to load model, exiting...")


class PreferenceInput(BaseModel):
    elevation: Optional[int]
    difficulty: Optional[str]
    duration: Optional[int]
    cost: Optional[int]
    tags: Optional[List[str]]

@router.post("/recommend-poi")
async def recommend_poi(input_data: PreferenceInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        preferences = input_data.dict(exclude_none=True)
        recommendations_raw = model.get_recommendations(preferences)

        # Enrich recommendations with _id if not already present
        db =  get_database()
        all_itineraries = await db["itinerary"].find().to_list(length=1000)
        itinerary_lookup = {it["title"]: str(it["_id"]) for it in all_itineraries}

        enriched_recommendations = []
        for r in recommendations_raw:
            title = r.get("poi_name") or r.get("title")
            enriched_recommendations.append({
                "_id": itinerary_lookup.get(title, "unknown"),
                "title": title,
                "difficulty": r.get("difficulty", "N/A"),
                "elevation": r.get("elevation", "N/A"),
                "duration": r.get("duration", "N/A"),
                "cost": r.get("cost", "N/A"),
                "similarity_score": r.get("similarity_score", 0)
            })

        return enriched_recommendations

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    if model is None:
        sys.exit("Failed to load model, exiting...")
    else:
        print("Model loaded successfully for testing.")
