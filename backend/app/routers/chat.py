"""
Chat Router
Handles AI medical assistant chat interactions
"""
from fastapi import APIRouter, HTTPException, Depends
from app.schemas.chat import ChatRequest, ChatResponse
from app.core.dependencies import get_ai_service
from app.services.ai_service import AIService
from app.utils.disclaimers import get_chat_disclaimer
import uuid
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    ai_service: AIService = Depends(get_ai_service)
) -> ChatResponse:
    """
    Chat endpoint for AI medical assistant
    Provides healthcare-safe, informational responses
    
    Args:
        request: Chat request with user message
        ai_service: Injected AI service instance
    
    Returns:
        Chat response with AI-generated message and disclaimer
    
    Raises:
        HTTPException: If message processing fails
    """
    try:
        # Generate or use conversation ID
        conversation_id = request.conversation_id or str(uuid.uuid4())
        
        # Generate AI response using injected service
        ai_response = await ai_service.generate_response(request.message)
        
        # Get disclaimer
        disclaimer = get_chat_disclaimer()
        
        logger.info(f"Chat response generated for conversation: {conversation_id}")
        
        return ChatResponse(
            response=ai_response,
            conversation_id=conversation_id,
            disclaimer=disclaimer
        )
    
    except Exception as e:
        logger.error(f"Error processing chat request: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request. Please try again."
        )

