import React, { useState } from 'react'

/**
 * Appointment Assistance Page
 * Doctor category selection and appointment booking form
 * UI only - no backend logic required
 */
const AppointmentAssistancePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Doctor categories
  const doctorCategories = [
    {
      id: 1,
      name: 'General Physician',
      icon: '👨‍⚕️',
      description: 'General health checkups, common illnesses, and preventive care'
    },
    {
      id: 2,
      name: 'Cardiologist',
      icon: '❤️',
      description: 'Heart and cardiovascular system health'
    },
    {
      id: 3,
      name: 'Dermatologist',
      icon: '🧴',
      description: 'Skin, hair, and nail conditions'
    },
    {
      id: 4,
      name: 'Pediatrician',
      icon: '👶',
      description: 'Child health and development'
    },
    {
      id: 5,
      name: 'Orthopedist',
      icon: '🦴',
      description: 'Bones, joints, and musculoskeletal system'
    },
    {
      id: 6,
      name: 'Neurologist',
      icon: '🧠',
      description: 'Brain, nervous system, and neurological conditions'
    }
  ]

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setIsSubmitted(false)
  }

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedCategory) {
      alert('Please select a doctor category first')
      return
    }
    // Simulate form submission (replace with actual API call)
    setIsSubmitted(true)
    console.log('Appointment Request:', {
      category: selectedCategory.name,
      ...formData
    })
  }

  // Reset form
  const handleReset = () => {
    setSelectedCategory(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      reason: ''
    })
    setIsSubmitted(false)
  }

  return (
    <div className="container section-padding">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="mb-3">Book an Appointment</h1>
          <p className="text-muted text-large">
            Select a doctor category and fill in your details to schedule an appointment
          </p>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-success fade-in" role="alert">
              <h4 className="alert-heading">Appointment Request Submitted!</h4>
              <p>
                Your appointment request for <strong>{selectedCategory.name}</strong> has been received. 
                Our team will contact you shortly to confirm your appointment.
              </p>
              <hr />
              <p className="mb-0">
                <button className="btn btn-outline-success" onClick={handleReset}>
                  Book Another Appointment
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="row g-4">
        {/* Doctor Categories */}
        <div className="col-lg-6">
          <h3 className="mb-4">Select Doctor Category</h3>
          <div className="row g-3">
            {doctorCategories.map((category) => (
              <div key={category.id} className="col-md-6">
                <div
                  className={`doctor-category-card ${
                    selectedCategory?.id === category.id ? 'border-primary' : ''
                  }`}
                  onClick={() => handleCategorySelect(category)}
                  className={selectedCategory?.id === category.id ? 'category-selected' : ''}
                >
                  <div className="doctor-category-icon">{category.icon}</div>
                  <h4 className="doctor-category-title">{category.name}</h4>
                  <p className="doctor-category-description">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Form */}
        <div className="col-lg-6">
          <div className="appointment-form">
            <h3 className="mb-4">Appointment Details</h3>
            
            {selectedCategory ? (
              <div className="mb-3 p-3 bg-soft rounded">
                <strong>Selected:</strong> {selectedCategory.name}
              </div>
            ) : (
              <div className="alert alert-info" role="alert">
                Please select a doctor category to proceed with booking.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="date" className="form-label">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="time" className="form-label">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="reason" className="form-label">
                  Reason for Visit
                </label>
                <textarea
                  className="form-control"
                  id="reason"
                  name="reason"
                  rows="4"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Briefly describe the reason for your appointment (optional)"
                ></textarea>
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={!selectedCategory}
                >
                  Submit Appointment Request
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Information Note */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="alert alert-info" role="alert">
            <strong>Note:</strong> This is a booking request form. Our team will contact you 
            to confirm your appointment time and provide further instructions. For urgent 
            medical concerns, please contact emergency services immediately.
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentAssistancePage


