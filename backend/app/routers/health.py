"""
Health Check Router
Provides system health and readiness endpoints
"""
from fastapi import APIRouter
from typing import Dict
from app.core.config import settings

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("", response_model=Dict[str, str])
async def health_check() -> Dict[str, str]:
    """
    Health check endpoint
    Returns API status and version information
    
    Returns:
        Dictionary with health status
    """
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION
    }


@router.get("/ready", response_model=Dict[str, str])
async def readiness_check() -> Dict[str, str]:
    """
    Readiness check endpoint
    Verifies the API is ready to accept requests
    
    Returns:
        Dictionary with readiness status
    """
    return {
        "status": "ready",
        "service": settings.APP_NAME
    }


@router.get("/version", response_model=Dict[str, str])
async def version() -> Dict[str, str]:
    """
    Version endpoint
    Returns API version information
    
    Returns:
        Dictionary with version details
    """
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running"
    }

