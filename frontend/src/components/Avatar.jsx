import React from 'react'

/**
 * Avatar Component
 * Displays AI medical assistant avatar with status indicators
 * Ready for LiveKit video stream integration
 * 
 * @param {string} status - Current status: 'listening', 'speaking', or 'idle'
 * @param {string} videoStream - Optional video stream URL/source for LiveKit
 */
const Avatar = ({ status = 'idle', videoStream = null }) => {
  // Status configuration
  const statusConfig = {
    listening: {
      label: 'Listening',
      className: 'status-listening',
      icon: '👂'
    },
    speaking: {
      label: 'Speaking',
      className: 'status-speaking',
      icon: '🗣️'
    },
    idle: {
      label: 'Ready',
      className: 'status-idle',
      icon: '💬'
    }
  }

  const currentStatus = statusConfig[status] || statusConfig.idle

  return (
    <div className="avatar-container">
      <div className="avatar-wrapper">
        {videoStream ? (
          <video
            className="avatar-video"
            src={videoStream}
            autoPlay
            muted
            playsInline
          />
        ) : (
          <div className="avatar-placeholder">
            <span className="icon-large">👨‍⚕️</span>
          </div>
        )}
      </div>
      <div className="avatar-status">
        <span className={`status-indicator ${currentStatus.className}`}></span>
        <span>{currentStatus.label}</span>
      </div>
    </div>
  )
}

export default Avatar


