# AI Chat — Production-Level

A full-stack AI chat application powered by Google Gemini 2.5 Flash.

## Architecture

```
.
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── main.py           # Application entry point
│   │   ├── config.py         # Settings (env-based)
│   │   ├── models/           # Pydantic schemas
│   │   ├── services/         # Gemini service layer
│   │   ├── routers/          # API route handlers
│   │   └── middleware/       # Rate limiting
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/         # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Header, ChatWindow, ChatInput, MessageBubble
│   │   ├── api.js            # API client with streaming support
│   │   ├── App.jsx
│   │   └── styles.css        # Design tokens from ChatGPT design system
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
└── docker-compose.yml
```

## Quick Start

### Docker (recommended)

```bash
cp backend/.env.example backend/.env
# Edit backend/.env and add your GOOGLE_API_KEY

docker-compose up --build
```

Frontend: http://localhost:3000 | API docs: http://localhost:8000/docs

### Manual Setup

**Backend:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your GOOGLE_API_KEY to .env
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/chat` | Send message, get full response |
| `POST` | `/api/v1/chat-stream` | Send message, stream response (SSE) |
| `GET` | `/api/v1/health` | Health check |
| `GET` | `/docs` | Swagger UI |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_API_KEY` | Google AI API key |
| `CORS_ORIGINS` | Allowed CORS origins (JSON array) |
| `MAX_REQUESTS_PER_MINUTE` | Rate limit per client |
| `GEMINI_MODEL` | Gemini model ID |
