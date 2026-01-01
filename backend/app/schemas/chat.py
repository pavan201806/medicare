"""
Chat Request/Response Schemas
Pydantic models for chat endpoint
"""
from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID


class ChatRequest(BaseModel):
    """
    Request schema for chat endpoint
    """
    message: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="User's message to the AI medical assistant"
    )
    conversation_id: Optional[str] = Field(
        None,
        description="Optional conversation ID for maintaining context"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "I have frequent headaches",
                "conversation_id": "123e4567-e89b-12d3-a456-426614174000"
            }
        }


class ChatResponse(BaseModel):
    """
    Response schema for chat endpoint
    """
    response: str = Field(
        ...,
        description="AI assistant's response to the user's message"
    )
    conversation_id: str = Field(
        ...,
        description="Conversation ID for maintaining context"
    )
    disclaimer: str = Field(
        ...,
        description="Medical disclaimer appended to the response"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "response": "I can share general information about headaches...",
                "conversation_id": "123e4567-e89b-12d3-a456-426614174000",
                "disclaimer": "This information is provided for educational purposes only..."
            }
        }

