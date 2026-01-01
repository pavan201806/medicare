import React, { useState } from 'react'

/**
 * Medicine Assistance Page
 * Search interface for medicine information
 * Clean card layout with usage and precautions
 */
const MedicineAssistancePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  // Sample medicine data (replace with actual API call)
  const sampleMedicines = [
    {
      id: 1,
      name: 'Paracetamol',
      usage: 'Paracetamol is used to relieve mild to moderate pain and reduce fever. It is commonly used for headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.',
      precautions: [
        'Do not exceed the recommended dosage',
        'Avoid alcohol while taking this medication',
        'Consult a doctor if symptoms persist for more than 3 days',
        'Not recommended for children under 2 years without medical supervision',
        'Inform your doctor if you have liver or kidney problems'
      ]
    },
    {
      id: 2,
      name: 'Ibuprofen',
      usage: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce inflammation, pain, and fever. It is commonly used for conditions like arthritis, menstrual cramps, and minor injuries.',
      precautions: [
        'Take with food or milk to reduce stomach upset',
        'Do not use if you have a history of stomach ulcers',
        'Avoid prolonged use without medical supervision',
        'May increase risk of heart attack or stroke',
        'Consult a doctor before use if you have heart, kidney, or liver conditions'
      ]
    },
    {
      id: 3,
      name: 'Amoxicillin',
      usage: 'Amoxicillin is an antibiotic used to treat various bacterial infections including respiratory infections, ear infections, urinary tract infections, and skin infections.',
      precautions: [
        'Complete the full course even if you feel better',
        'Do not share this medication with others',
        'Inform your doctor if you have allergies to penicillin',
        'May cause diarrhea - consult doctor if severe',
        'Take at regular intervals as prescribed'
      ]
    }
  ]

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setHasSearched(true)
    
    // Simulate search (replace with actual API call)
    const query = searchQuery.toLowerCase()
    const results = sampleMedicines.filter(medicine =>
      medicine.name.toLowerCase().includes(query)
    )
    
    setSearchResults(results)
  }

  // Clear search
  const handleClear = () => {
    setSearchQuery('')
    setSearchResults([])
    setHasSearched(false)
  }

  return (
    <div className="container section-padding">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="mb-3">Medicine Information</h1>
          <p className="text-muted text-large">
            Search for medicine information, usage, and important precautions
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-12">
          <form onSubmit={handleSearch}>
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search for medicine name (e.g., Paracetamol, Ibuprofen)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Medicine search"
              />
            </div>
            <div className="d-flex gap-2 justify-content-center mt-3">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
              {hasSearched && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClear}
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="row">
          <div className="col-12">
            {searchResults.length > 0 ? (
              <>
                <h3 className="mb-4">Search Results ({searchResults.length})</h3>
                {searchResults.map((medicine) => (
                  <div key={medicine.id} className="medicine-card fade-in">
                    <h3 className="medicine-name">{medicine.name}</h3>
                    
                    <div className="medicine-info-section">
                      <h5>Usage Information</h5>
                      <p>{medicine.usage}</p>
                    </div>

                    <div className="medicine-info-section">
                      <h5>Important Precautions</h5>
                      <ul>
                        {medicine.precautions.map((precaution, index) => (
                          <li key={index}>{precaution}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="alert alert-warning mt-3" role="alert">
                      <strong>Disclaimer:</strong> This information is for educational purposes only. 
                      Always consult with a qualified healthcare professional or pharmacist before 
                      taking any medication. Do not use this information as a substitute for professional 
                      medical advice.
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-5">
                <div className="mb-3 icon-medium">🔍</div>
                <h3>No Results Found</h3>
                <p className="text-muted">
                  We couldn't find any medicine matching "{searchQuery}". 
                  Please try a different search term or consult with a pharmacist.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Initial State - Popular Medicines */}
      {!hasSearched && (
        <div className="row">
          <div className="col-12">
            <h3 className="mb-4 text-center">Popular Medicines</h3>
            <div className="row g-4">
              {sampleMedicines.slice(0, 3).map((medicine) => (
                <div key={medicine.id} className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h4 className="card-title text-primary-custom">{medicine.name}</h4>
                      <p className="card-text text-muted">
                        {medicine.usage.substring(0, 100)}...
                      </p>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setSearchQuery(medicine.name)
                          setHasSearched(true)
                          setSearchResults([medicine])
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicineAssistancePage


