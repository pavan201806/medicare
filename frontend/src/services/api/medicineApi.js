import { apiRequest } from './config'

/**
 * Medicine API Service
 * Handles all medicine-related API calls
 */

/**
 * Search for medicine information
 * @param {string} query - Medicine name to search
 * @returns {Promise<Object>} Medicine search results with disclaimer
 */
export const searchMedicine = async (query) => {
  const params = new URLSearchParams({ q: query })
  return apiRequest(`/medicine/search?${params.toString()}`, {
    method: 'GET',
  })
}

