"""
Appointment Request/Response Schemas
Pydantic models for appointment endpoint
"""
from pydantic import BaseModel, Field
from datetime import date
from typing import Optional


class AppointmentRequest(BaseModel):
    """
    Request schema for appointment booking
    """
    name: str = Field(
        ...,
        min_length=1,
        max_length=200,
        description="Patient's full name"
    )
    email: str = Field(
        ...,
        description="Patient's email address"
    )
    phone: str = Field(
        ...,
        min_length=1,
        max_length=20,
        description="Patient's phone number"
    )
    category: str = Field(
        ...,
        description="Doctor category (e.g., General Physician, Cardiologist)"
    )
    preferred_date: date = Field(
        ...,
        description="Preferred appointment date"
    )
    preferred_time: Optional[str] = Field(
        None,
        description="Preferred appointment time (HH:MM format)"
    )
    reason: Optional[str] = Field(
        None,
        max_length=1000,
        description="Reason for visit (optional)"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Jane Doe",
                "email": "jane.doe@example.com",
                "phone": "+1-555-123-4567",
                "category": "Dermatologist",
                "preferred_date": "2026-01-12",
                "preferred_time": "10:00",
                "reason": "Routine skin checkup"
            }
        }


class AppointmentResponse(BaseModel):
    """
    Response schema for appointment booking
    """
    message: str = Field(
        ...,
        description="Confirmation message for the appointment request"
    )
    note: str = Field(
        ...,
        description="Important note about the appointment request"
    )
    disclaimer: str = Field(
        ...,
        description="Medical disclaimer for appointments"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "Your appointment request has been recorded.",
                "note": "This does not confirm a booking. Our team will contact you shortly.",
                "disclaimer": "This appointment request does not confirm a booking..."
            }
        }

