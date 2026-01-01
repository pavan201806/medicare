import { apiRequest } from './config'

/**
 * Chat API Service
 * Handles all chat-related API calls
 */

/**
 * Send a chat message to the AI assistant
 * @param {string} message - User's message
 * @param {string|null} conversationId - Optional conversation ID
 * @returns {Promise<Object>} Chat response with message and disclaimer
 */
export const sendChatMessage = async (message, conversationId = null) => {
  const payload = {
    message,
    ...(conversationId && { conversation_id: conversationId })
  }

  return apiRequest('/chat', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

