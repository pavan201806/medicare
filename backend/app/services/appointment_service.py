"""
Appointment Service
Handles appointment request processing
UI-only support - no actual scheduling logic
"""
from app.schemas.appointment import AppointmentRequest
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class AppointmentService:
    """
    Service for handling appointment requests
    """
    
    def process_appointment_request(self, request: AppointmentRequest) -> dict:
        """
        Process an appointment request
        In production, this would save to a database
        
        Args:
            request: Appointment request data
        
        Returns:
            Dictionary with processing result
        """
        # Log the appointment request (in production, save to database)
        logger.info(
            f"Appointment request received: {request.name}, "
            f"Category: {request.category}, Date: {request.preferred_date}"
        )
        
        # Validate date is not in the past
        if request.preferred_date < datetime.now().date():
            return {
                "valid": False,
                "message": "Preferred date cannot be in the past."
            }
        
        # In a real application, you would:
        # 1. Save to database
        # 2. Send confirmation email
        # 3. Notify healthcare staff
        # 4. Check availability
        
        # For now, just return success
        return {
            "valid": True,
            "message": "Appointment request has been recorded successfully."
        }


# Global appointment service instance
appointment_service = AppointmentService()

