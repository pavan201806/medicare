# AI Medical Assistant - Monorepo

A production-ready full-stack AI Medical Assistant application with a React frontend and FastAPI backend.

## 📁 Project Structure

```
Bpl_lab/
├── frontend/          # React + Vite frontend
│   ├── src/          # React components and pages
│   ├── package.json
│   └── vite.config.js
│
├── backend/          # FastAPI backend
│   ├── app/          # Application code
│   └── requirements.txt
│
└── README.md         # This file
```

## 🚀 Quick Start

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

   Backend will run on `http://localhost:8000`

## 🔌 API Configuration

The frontend is configured to connect to the backend at `http://localhost:8000` via the `VITE_API_BASE_URL` environment variable in `frontend/.env`.

## 📚 Documentation

- **Frontend**: See `frontend/README.md` for frontend-specific documentation
- **Backend**: See `backend/README.md` for backend API documentation

## 🏥 Features

- **Medical Assistant Chat**: AI-powered health information assistant
- **Medicine Search**: Educational medicine information lookup
- **Appointment Booking**: Doctor category selection and appointment requests
- **Healthcare-Safe Design**: Professional, accessible UI suitable for all ages

## ⚠️ Important

This application provides educational health information only. It does not diagnose, prescribe, or provide medical advice. Always consult with qualified healthcare professionals.

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Bootstrap 5
- React Router DOM

**Backend:**
- FastAPI
- Python 3.10+
- Pydantic
- OpenAI (optional)

## 📝 Development

Both frontend and backend can run simultaneously:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
