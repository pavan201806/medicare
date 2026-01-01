import React from 'react'

/**
 * Reusable Card Component
 * Healthcare-appropriate card styling with Bootstrap
 */
const Card = ({
  children,
  title,
  className = '',
  shadow = true,
  ...props
}) => {
  const shadowClass = shadow ? 'shadow-soft' : ''
  
  return (
    <div className={`card ${shadowClass} ${className}`.trim()} {...props}>
      {title && (
        <div className="card-header">
          <h5 className="mb-0">{title}</h5>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default Card

