"""
Response Wrapper Utilities
Standardized API response formatting
"""
from typing import Any, Dict, Optional
from fastapi.responses import JSONResponse


def success_response(
    data: Any,
    message: Optional[str] = None,
    status_code: int = 200
) -> JSONResponse:
    """
    Create a standardized success response
    
    Args:
        data: Response data
        message: Optional success message
        status_code: HTTP status code
    
    Returns:
        JSONResponse with standardized format
    """
    response_data = {
        "success": True,
        "data": data,
    }
    
    if message:
        response_data["message"] = message
    
    return JSONResponse(
        status_code=status_code,
        content=response_data
    )


def error_response(
    message: str,
    status_code: int = 400,
    details: Optional[Dict[str, Any]] = None
) -> JSONResponse:
    """
    Create a standardized error response
    
    Args:
        message: Error message
        status_code: HTTP status code
        details: Optional additional error details
    
    Returns:
        JSONResponse with standardized error format
    """
    response_data = {
        "success": False,
        "error": message,
    }
    
    if details:
        response_data["details"] = details
    
    return JSONResponse(
        status_code=status_code,
        content=response_data
    )

