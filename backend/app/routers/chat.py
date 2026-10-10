from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from ..models.chat import ChatRequest, ChatResponse, HealthResponse
from ..services.gemini_service import gemini_service
from ..config import get_settings

router = APIRouter(prefix="/api/v1", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        conversation_history = [
            {"role": msg.role.value, "parts": [{"text": msg.content}]}
            for msg in request.conversation
        ]
        reply = await gemini_service.generate_response(
            conversation_history, request.message
        )
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    try:
        conversation_history = [
            {"role": msg.role.value, "parts": [{"text": msg.content}]}
            for msg in request.conversation
        ]

        async def generate():
            async for chunk in gemini_service.stream_response(
                conversation_history, request.message
            ):
                yield f"data: {chunk}\n\n"
            yield "data: [DONE]\n\n"

        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health", response_model=HealthResponse)
async def health():
    settings = get_settings()
    return HealthResponse(status="healthy", version=settings.APP_VERSION)
