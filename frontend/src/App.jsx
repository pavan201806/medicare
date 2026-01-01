import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AvatarProvider } from './contexts/AvatarContext'
import { ChatProvider } from './contexts/ChatContext'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import MedicalAssistantPage from './pages/MedicalAssistantPage'
import MedicineAssistancePage from './pages/MedicineAssistancePage'
import AppointmentAssistancePage from './pages/AppointmentAssistancePage'

/**
 * Main App Component
 * Sets up routing and application structure with context providers
 */
function App() {
  return (
    <AvatarProvider>
      <ChatProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/assistant" element={<MedicalAssistantPage />} />
              <Route path="/medicine" element={<MedicineAssistancePage />} />
              <Route path="/appointment" element={<AppointmentAssistancePage />} />
            </Routes>
          </div>
        </Router>
      </ChatProvider>
    </AvatarProvider>
  )
}

export default App


