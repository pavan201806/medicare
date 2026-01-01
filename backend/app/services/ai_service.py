"""
AI Service
Handles AI-powered medical assistant responses
Supports OpenAI integration with safe fallback
"""
import os
import httpx
from typing import Optional
from app.core.config import settings
from app.utils.disclaimers import get_chat_disclaimer
import logging

logger = logging.getLogger(__name__)


class AIService:
    """
    Service for generating AI medical assistant responses
    """
    
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        self.model = settings.OPENAI_MODEL
        self.temperature = settings.OPENAI_TEMPERATURE
        self.max_tokens = settings.OPENAI_MAX_TOKENS
        self.use_openai = bool(self.api_key)
    
    def _get_system_prompt(self) -> str:
        """
        Get system prompt for AI assistant
        Ensures healthcare-safe, conservative responses
        
        Returns:
            System prompt string
        """
        return """You are a professional AI medical assistant providing general health information. 
Your role is to:
- Provide educational, non-prescriptive information
- Use calm, empathetic, and professional language
- Never diagnose, prescribe, or provide urgent medical advice
- Encourage consultation with healthcare professionals when appropriate
- Use language suitable for elderly users (clear, simple, non-alarming)
- Avoid technical jargon unless necessary

Always maintain a neutral, supportive tone. Never create urgency or alarm."""

    def _get_safe_fallback_response(self, user_message: str) -> str:
        """
        Generate safe fallback response when OpenAI is not available
        Provides healthcare-appropriate responses without AI
        
        Args:
            user_message: User's message
            
        Returns:
            Safe, conservative medical response
        """
        message_lower = user_message.lower()
        
        # Common health topics with safe responses
        if any(word in message_lower for word in ['headache', 'head', 'pain']):
            return (
                "I understand you're experiencing headaches. Headaches can have various causes "
                "including stress, dehydration, tension, or underlying health conditions. "
                "It's important to stay hydrated, get adequate rest, and manage stress. "
                "If headaches are frequent, severe, or persistent, I strongly recommend "
                "consulting with a healthcare professional for proper evaluation."
            )
        
        elif any(word in message_lower for word in ['fever', 'temperature', 'hot']):
            return (
                "Fever is your body's natural response to infection or illness. "
                "For mild fevers, rest and hydration are important. Monitor your temperature "
                "and symptoms. If the fever is high (above 101.3°F or 38.5°C), persistent, "
                "or accompanied by severe symptoms, please consult with a healthcare professional "
                "promptly for appropriate care."
            )
        
        elif any(word in message_lower for word in ['cough', 'cold', 'flu']):
            return (
                "Respiratory symptoms like coughs and colds are common. Rest, hydration, and "
                "proper nutrition can support your recovery. If symptoms are severe, persistent, "
                "or you have difficulty breathing, please seek medical attention. "
                "A healthcare professional can provide appropriate guidance for your specific situation."
            )
        
        elif any(word in message_lower for word in ['stomach', 'nausea', 'digest', 'stomachache']):
            return (
                "Digestive discomfort can result from various factors including diet, stress, "
                "or underlying conditions. Staying hydrated and eating light, easily digestible foods "
                "may help. If symptoms are severe, persistent, or accompanied by other concerning "
                "symptoms, please consult with a healthcare professional."
            )
        
        elif any(word in message_lower for word in ['sleep', 'insomnia', 'tired', 'fatigue']):
            return (
                "Sleep issues can significantly impact your health and well-being. "
                "Maintaining a regular sleep schedule, creating a comfortable sleep environment, "
                "and managing stress can help. If sleep problems persist or significantly affect "
                "your daily life, I recommend discussing this with a healthcare professional "
                "who can provide personalized guidance."
            )
        
        else:
            return (
                "Thank you for your question. I'm here to provide general health information. "
                "For specific medical concerns, symptoms, or health questions, I strongly recommend "
                "consulting with a qualified healthcare professional who can provide personalized "
                "advice based on your medical history and current condition. "
                "Is there any general health information I can help you with today?"
            )
    
    async def generate_response(self, user_message: str) -> str:
        """
        Generate AI response to user message
        Uses OpenAI if available, otherwise uses safe fallback
        
        Args:
            user_message: User's message
        
        Returns:
            AI-generated or fallback response
        """
        if not self.use_openai:
            logger.info("OpenAI API key not found, using safe fallback response")
            return self._get_safe_fallback_response(user_message)
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": self.model,
                        "messages": [
                            {"role": "system", "content": self._get_system_prompt()},
                            {"role": "user", "content": user_message}
                        ],
                        "temperature": self.temperature,
                        "max_tokens": self.max_tokens,
                    },
                )
                response.raise_for_status()
                data = response.json()
                ai_response = data["choices"][0]["message"]["content"].strip()
                logger.info("Successfully generated AI response")
                return ai_response
        
        except httpx.HTTPError as e:
            logger.warning(f"OpenAI API error: {e}, using fallback response")
            return self._get_safe_fallback_response(user_message)
        
        except Exception as e:
            logger.error(f"Unexpected error in AI service: {e}, using fallback response")
            return self._get_safe_fallback_response(user_message)


# Global AI service instance
ai_service = AIService()

