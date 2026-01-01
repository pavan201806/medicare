"""
Medicine Request/Response Schemas
Pydantic models for medicine search endpoint
"""
from pydantic import BaseModel, Field
from typing import List


class MedicineInfo(BaseModel):
    """
    Medicine information schema
    """
    name: str = Field(..., description="Name of the medicine")
    usage: str = Field(..., description="General usage information")
    precautions: List[str] = Field(
        ...,
        description="List of important precautions (non-prescriptive)"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Paracetamol",
                "usage": "Commonly used for pain and fever relief",
                "precautions": [
                    "Avoid excessive use",
                    "Consult a healthcare professional if symptoms persist",
                    "Do not exceed recommended dosage"
                ]
            }
        }


class MedicineSearchResponse(BaseModel):
    """
    Response schema for medicine search endpoint
    """
    results: List[MedicineInfo] = Field(
        ...,
        description="List of medicine information matching the search query"
    )
    disclaimer: str = Field(
        ...,
        description="Medical disclaimer for medicine information"
    )
    query: str = Field(..., description="Original search query")
    
    class Config:
        json_schema_extra = {
            "example": {
                "results": [
                    {
                        "name": "Paracetamol",
                        "usage": "Commonly used for pain and fever relief",
                        "precautions": [
                            "Avoid excessive use",
                            "Consult a healthcare professional"
                        ]
                    }
                ],
                "disclaimer": "This medicine information is for educational purposes only...",
                "query": "paracetamol"
            }
        }

