import React from 'react'

/**
 * Reusable Badge Component
 * Healthcare-appropriate badge styling with Bootstrap
 */
const Badge = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <span className={`badge bg-${variant} ${className}`.trim()} {...props}>
      {children}
    </span>
  )
}

export default Badge

