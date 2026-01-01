"""
Main FastAPI Application
Entry point for the AI Medical Assistant API
"""
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.core.cors import setup_cors
from app.core.logging import setup_logging
from app.routers import health, chat, medicine, appointment
import logging

# Setup logging
setup_logging()

logger = logging.getLogger(__name__)

# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "AI Medical Assistant API - Provides healthcare-safe, informational "
        "responses for medical queries, medicine information, and appointment requests."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

# Setup CORS
setup_cors(app)

# Include routers
app.include_router(health.router)
app.include_router(chat.router)
app.include_router(medicine.router)
app.include_router(appointment.router)


@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint
    Returns API information
    """
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "docs": "/docs",
        "health": "/health",
        "version_endpoint": "/health/version"
    }


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """
    Global exception handler
    Provides consistent error responses
    """
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal server error occurred. Please try again later."
        }
    )


@app.on_event("startup")
async def startup_event():
    """
    Startup event handler
    Logs application startup information
    """
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    logger.info(f"Debug mode: {settings.DEBUG}")
    logger.info(f"CORS origins: {settings.cors_origins_list}")
    if settings.OPENAI_API_KEY:
        logger.info("OpenAI integration enabled")
    else:
        logger.info("OpenAI integration disabled - using safe fallback responses")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )

