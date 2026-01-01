"""
Appointment Router
Handles appointment request submissions
UI-only support - no actual scheduling
"""
from fastapi import APIRouter, HTTPException
from app.schemas.appointment import AppointmentRequest, AppointmentResponse
from app.services.appointment_service import appointment_service
from app.utils.disclaimers import get_appointment_disclaimer
from datetime import date
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/appointment", tags=["Appointment"])


@router.post("/request", response_model=AppointmentResponse)
async def create_appointment_request(
    request: AppointmentRequest
) -> AppointmentResponse:
    """
    Create an appointment request
    This is UI-only - does not actually schedule appointments
    
    Args:
        request: Appointment request data
    
    Returns:
        Appointment response with confirmation message
    
    Raises:
        HTTPException: If request processing fails
    """
    try:
        # Validate date is not in the past
        if request.preferred_date < date.today():
            raise HTTPException(
                status_code=400,
                detail="Preferred date cannot be in the past."
            )
        
        # Process appointment request
        result = appointment_service.process_appointment_request(request)
        
        if not result["valid"]:
            raise HTTPException(
                status_code=400,
                detail=result["message"]
            )
        
        # Get disclaimer
        disclaimer = get_appointment_disclaimer()
        
        logger.info(f"Appointment request processed for: {request.name}")
        
        return AppointmentResponse(
            message="Your appointment request has been recorded.",
            note="This does not confirm a booking. Our team will contact you shortly to confirm your appointment.",
            disclaimer=disclaimer
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing appointment request: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your appointment request. Please try again."
        )

