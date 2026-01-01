"""
Medical Disclaimer Utilities
Centralized medical disclaimers for all responses
"""

# Primary medical disclaimer
MEDICAL_DISCLAIMER = (
    "This information is provided for educational purposes only and should not "
    "be considered medical advice, diagnosis, or treatment. Always consult with "
    "a qualified healthcare professional for medical advice, diagnosis, or treatment."
)

# Chat-specific disclaimer
CHAT_DISCLAIMER = (
    "I am an AI assistant providing general health information. I cannot diagnose, "
    "prescribe, or provide medical advice. Please consult with a qualified healthcare "
    "professional for any medical concerns."
)

# Medicine-specific disclaimer
MEDICINE_DISCLAIMER = (
    "This medicine information is for educational purposes only. Do not use this "
    "information to diagnose or treat a health problem. Always consult with a "
    "pharmacist or healthcare provider before taking any medication."
)

# Appointment disclaimer
APPOINTMENT_DISCLAIMER = (
    "This appointment request does not confirm a booking. Our team will contact you "
    "to confirm your appointment. For urgent medical concerns, please contact "
    "emergency services immediately."
)


def get_chat_disclaimer() -> str:
    """
    Get disclaimer text for chat responses
    
    Returns:
        Chat-specific disclaimer string
    """
    return CHAT_DISCLAIMER


def get_medicine_disclaimer() -> str:
    """
    Get disclaimer text for medicine information
    
    Returns:
        Medicine-specific disclaimer string
    """
    return MEDICINE_DISCLAIMER


def get_appointment_disclaimer() -> str:
    """
    Get disclaimer text for appointment requests
    
    Returns:
        Appointment-specific disclaimer string
    """
    return APPOINTMENT_DISCLAIMER


def get_general_disclaimer() -> str:
    """
    Get general medical disclaimer
    
    Returns:
        General medical disclaimer string
    """
    return MEDICAL_DISCLAIMER


def append_disclaimer(text: str, disclaimer_type: str = "general") -> str:
    """
    Append appropriate disclaimer to text based on type
    
    Args:
        text: Original text
        disclaimer_type: Type of disclaimer ('chat', 'medicine', 'appointment', 'general')
    
    Returns:
        Text with disclaimer appended
    """
    disclaimers = {
        "chat": get_chat_disclaimer(),
        "medicine": get_medicine_disclaimer(),
        "appointment": get_appointment_disclaimer(),
        "general": get_general_disclaimer(),
    }
    
    disclaimer = disclaimers.get(disclaimer_type, get_general_disclaimer())
    return f"{text}\n\n⚠️ {disclaimer}"

