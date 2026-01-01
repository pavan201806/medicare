import React, { useState, useRef } from 'react'
import { useAvatar } from '../contexts/AvatarContext'
import { useChat } from '../contexts/ChatContext'
import { sendChatMessage } from '../services/api/chatApi'
import Avatar from '../components/Avatar'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'

/**
 * Medical Assistant Page
 * Chat interface with voice input and AI avatar
 * Professional medical app styling (not WhatsApp-style)
 * Uses React Context for state management
 */
const MedicalAssistantPage = () => {
  const { status: avatarStatus, setAvatarStatus } = useAvatar()
  const {
    messages,
    isLoading,
    conversationId,
    messagesEndRef,
    setLoading,
    setConversationId,
    addUserMessage,
    addAssistantMessage,
    formatTime
  } = useChat()
  
  const [inputValue, setInputValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const chatContainerRef = useRef(null)

  // Handle sending message
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const messageText = inputValue.trim()
    setInputValue('')
    setAvatarStatus('listening')

    // Add user message
    addUserMessage(messageText)

    try {
      setLoading(true)
      
      // Call API
      const response = await sendChatMessage(messageText, conversationId)
      
      // Update conversation ID if provided
      if (response.conversation_id) {
        setConversationId(response.conversation_id)
      }

      // Update avatar status
      setAvatarStatus('speaking')

      // Add assistant message with disclaimer
      addAssistantMessage(response.response, response.disclaimer)

      // Return to idle after speaking
      setTimeout(() => {
        setAvatarStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Chat error:', error)
      setAvatarStatus('idle')
      // Fallback message on error
      addAssistantMessage(
        'I apologize, but I\'m having trouble processing your request right now. Please try again or consult with a healthcare professional for immediate assistance.',
        'This information is provided for educational purposes only.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Handle voice recording
  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setAvatarStatus('listening')
      // Simulate voice recording (replace with actual voice input implementation)
      setTimeout(() => {
        setIsRecording(false)
        setAvatarStatus('idle')
        // In real implementation, process voice input here
      }, 3000)
    } else {
      setIsRecording(false)
      setAvatarStatus('idle')
    }
  }

  return (
    <div className="container section-padding">
      <div className="row">
        <div className="col-12 mb-4">
          <h1 className="text-center mb-3">Medical Assistant</h1>
          <p className="text-center text-muted text-large">
            Chat with our AI medical assistant for health guidance and information
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Avatar Section */}
        <div className="col-lg-4 col-md-12">
          <div className="card shadow-soft">
            <div className="card-body text-center">
              <Avatar status={avatarStatus} />
              <div className="mt-4">
                <h5 className="text-primary-custom">AI Medical Assistant</h5>
                <p className="text-muted">
                  Always here to help with your health questions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="col-lg-8 col-md-12">
          <div className="chat-container" ref={chatContainerRef}>
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.type} fade-in`}
                >
                  <div className={`message-content ${message.type}`}>
                    {message.content}
                  </div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="chat-input-container">
              <input
                type="text"
                className="form-control chat-input"
                placeholder="Type your health question here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                aria-label="Chat input"
              />
              <button
                type="button"
                className={`voice-button ${isRecording ? 'recording' : ''}`}
                onClick={handleVoiceToggle}
                aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
                title={isRecording ? 'Stop recording' : 'Start voice input'}
                disabled={isLoading}
              >
                {isRecording ? '⏹️' : '🎤'}
              </button>
              <Button
                type="submit"
                variant="primary"
                disabled={!inputValue.trim() || isLoading}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </div>

          {/* Disclaimer */}
          <Alert variant="info" className="mt-3">
            <strong>Important:</strong> This AI assistant provides general health information only. 
            Always consult with qualified healthcare professionals for medical advice, diagnosis, or treatment.
          </Alert>
        </div>
      </div>
    </div>
  )
}

export default MedicalAssistantPage


