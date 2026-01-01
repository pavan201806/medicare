"""
Medicine Router
Handles medicine information search
"""
from fastapi import APIRouter, HTTPException, Query
from app.schemas.medicine import MedicineSearchResponse
from app.services.medicine_service import medicine_service
from app.utils.disclaimers import get_medicine_disclaimer
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/medicine", tags=["Medicine"])


@router.get("/search", response_model=MedicineSearchResponse)
async def search_medicine(
    q: str = Query(..., min_length=1, max_length=100, description="Medicine name to search")
) -> MedicineSearchResponse:
    """
    Search for medicine information
    Returns non-prescriptive, educational information only
    
    Args:
        q: Search query (medicine name)
    
    Returns:
        Medicine search results with disclaimer
    
    Raises:
        HTTPException: If search fails
    """
    try:
        # Search for medicines
        results = medicine_service.search_medicines(q)
        
        # Get disclaimer
        disclaimer = get_medicine_disclaimer()
        
        logger.info(f"Medicine search completed for query: {q}, found {len(results)} results")
        
        return MedicineSearchResponse(
            results=results,
            disclaimer=disclaimer,
            query=q
        )
    
    except Exception as e:
        logger.error(f"Error searching medicines: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while searching for medicine information. Please try again."
        )

