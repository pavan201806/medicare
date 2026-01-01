# AI Medical Assistant API

Production-ready FastAPI backend for the AI Medical Assistant frontend application.

## 🏥 Overview

This backend provides healthcare-safe, informational responses for:
- AI medical assistant chat interactions
- Medicine information search
- Appointment request handling

**Important**: This API provides educational information only. It does not diagnose, prescribe, or provide medical advice.

## 🚀 Quick Start

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key (optional):
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

5. **Run the server:**
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔌 API Endpoints

### Health Check
- `GET /health` - Health check endpoint
- `GET /health/ready` - Readiness check endpoint

### Chat
- `POST /chat` - Chat with AI medical assistant
  ```json
  {
    "message": "I have frequent headaches",
    "conversation_id": "optional-uuid"
  }
  ```

### Medicine Search
- `GET /medicine/search?q=paracetamol` - Search for medicine information

### Appointment
- `POST /appointment/request` - Submit appointment request
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1-555-123-4567",
    "category": "Dermatologist",
    "preferred_date": "2026-01-12",
    "preferred_time": "10:00",
    "reason": "Routine checkup"
  }
  ```

## 🧠 AI Integration

### OpenAI Integration (Optional)

The API supports OpenAI integration for enhanced AI responses:

1. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=sk-...
   ```

2. The API will automatically use OpenAI for chat responses.

### Safe Fallback

If no OpenAI API key is provided, the API uses a safe fallback system that provides healthcare-appropriate responses without requiring external AI services.

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI application entry point
│   ├── core/
│   │   ├── config.py          # Configuration management
│   │   ├── cors.py            # CORS setup
│   │   └── logging.py          # Logging configuration
│   ├── routers/
│   │   ├── chat.py            # Chat endpoint
│   │   ├── medicine.py        # Medicine search endpoint
│   │   ├── appointment.py     # Appointment endpoint
│   │   └── health.py          # Health check endpoint
│   ├── services/
│   │   ├── ai_service.py      # AI response generation
│   │   ├── medicine_service.py # Medicine search logic
│   │   └── appointment_service.py # Appointment processing
│   ├── schemas/
│   │   ├── chat.py            # Chat request/response models
│   │   ├── medicine.py        # Medicine models
│   │   └── appointment.py     # Appointment models
│   └── utils/
│       └── disclaimers.py     # Medical disclaimer utilities
├── .env.example               # Environment variables template
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## ⚠️ Medical Disclaimers

All API responses include appropriate medical disclaimers:

- Chat responses include disclaimers about AI limitations
- Medicine information includes educational-only disclaimers
- Appointment requests include booking confirmation disclaimers

These disclaimers are automatically appended to all relevant responses.

## 🔒 Security & Best Practices

- **CORS**: Configured for React frontend (Vite default ports)
- **Input Validation**: All inputs validated using Pydantic
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Logging**: Structured logging for debugging and monitoring
- **Environment Variables**: No hard-coded secrets

## 🚢 Deployment

### Local Development
```bash
uvicorn app.main:app --reload
```

### Production
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Using Gunicorn (Recommended for Production)
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 🧪 Testing

Test the API using the interactive docs at `/docs` or with curl:

```bash
# Health check
curl http://localhost:8000/health

# Chat
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "I have a headache"}'

# Medicine search
curl http://localhost:8000/medicine/search?q=paracetamol
```

## 📝 Environment Variables

See `.env.example` for all available configuration options.

## 🤝 Frontend Integration

This backend is designed to work seamlessly with the React frontend:

1. Start the backend: `uvicorn app.main:app --reload`
2. Start the frontend: `npm run dev` (in the `src` directory)
3. The frontend will connect to `http://localhost:8000`

## ⚠️ Important Notes

- **No Medical Diagnosis**: This API provides educational information only
- **No Prescriptions**: Never provides medication recommendations
- **Professional Consultation**: Always encourages consultation with healthcare professionals
- **Elderly-Friendly**: Responses are designed to be clear and non-alarming

## 📄 License

This project is for educational and hackathon purposes.

---

**Remember**: This API is designed for informational purposes only. Always consult with qualified healthcare professionals for medical advice.

