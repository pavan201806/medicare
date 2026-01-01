import React from 'react'

/**
 * Reusable Alert Component
 * Healthcare-appropriate alert styling with Bootstrap
 */
const Alert = ({
  children,
  variant = 'info',
  title,
  className = '',
  ...props
}) => {
  return (
    <div className={`alert alert-${variant} ${className}`.trim()} role="alert" {...props}>
      {title && <h4 className="alert-heading">{title}</h4>}
      {children}
    </div>
  )
}

export default Alert

