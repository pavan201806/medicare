import React, { createContext, useContext, useState, useRef, useEffect } from 'react'

/**
 * Chat Context
 * Manages chat messages, loading state, and conversation
 * Provides centralized state management for chat functionality
 */
const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI Medical Assistant. How can I help you today? You can ask me about symptoms, general health questions, or request medicine information.',
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      ...message,
      id: prev.length + 1,
      timestamp: message.timestamp || new Date()
    }])
  }

  const addUserMessage = (content) => {
    const userMessage = {
      type: 'user',
      content,
      timestamp: new Date()
    }
    addMessage(userMessage)
    return userMessage
  }

  const addAssistantMessage = (content, disclaimer = null) => {
    const assistantMessage = {
      type: 'assistant',
      content: disclaimer ? `${content}\n\n⚠️ ${disclaimer}` : content,
      timestamp: new Date()
    }
    addMessage(assistantMessage)
    return assistantMessage
  }

  const clearMessages = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: 'Hello! I\'m your AI Medical Assistant. How can I help you today? You can ask me about symptoms, general health questions, or request medicine information.',
        timestamp: new Date()
      }
    ])
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const value = {
    messages,
    isLoading,
    conversationId,
    messagesEndRef,
    setLoading: setIsLoading,
    setConversationId,
    addMessage,
    addUserMessage,
    addAssistantMessage,
    clearMessages,
    formatTime
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

