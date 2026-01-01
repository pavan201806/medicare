import { apiRequest } from './config'

/**
 * Appointment API Service
 * Handles all appointment-related API calls
 */

/**
 * Submit an appointment request
 * @param {Object} appointmentData - Appointment request data
 * @returns {Promise<Object>} Appointment response with confirmation
 */
export const submitAppointmentRequest = async (appointmentData) => {
  return apiRequest('/appointment/request', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  })
}

