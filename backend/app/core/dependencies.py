"""
Dependency Injection
Centralized dependency management for FastAPI
"""
from app.services.ai_service import AIService

# Global AI service instance (can be replaced for testing)
_ai_service_instance = None


def get_ai_service() -> AIService:
    """
    Get AI service instance (dependency injection)
    Allows for easy testing and service replacement
    
    Returns:
        AIService instance
    """
    global _ai_service_instance
    if _ai_service_instance is None:
        _ai_service_instance = AIService()
    return _ai_service_instance


def set_ai_service(service: AIService) -> None:
    """
    Set AI service instance (for testing)
    
    Args:
        service: AIService instance to use
    """
    global _ai_service_instance
    _ai_service_instance = service

