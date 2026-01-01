import React, { createContext, useContext, useState } from 'react'

/**
 * Avatar Context
 * Manages avatar state (idle, listening, speaking)
 * Provides centralized state management for avatar status
 */
const AvatarContext = createContext()

export const useAvatar = () => {
  const context = useContext(AvatarContext)
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider')
  }
  return context
}

export const AvatarProvider = ({ children }) => {
  const [status, setStatus] = useState('idle')
  const [videoStream, setVideoStream] = useState(null)

  const setAvatarStatus = (newStatus) => {
    if (['idle', 'listening', 'speaking'].includes(newStatus)) {
      setStatus(newStatus)
    } else {
      console.warn(`Invalid avatar status: ${newStatus}. Defaulting to 'idle'.`)
      setStatus('idle')
    }
  }

  const resetAvatar = () => {
    setStatus('idle')
  }

  const value = {
    status,
    videoStream,
    setAvatarStatus,
    setVideoStream,
    resetAvatar
  }

  return (
    <AvatarContext.Provider value={value}>
      {children}
    </AvatarContext.Provider>
  )
}

