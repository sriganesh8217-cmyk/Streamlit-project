import google.generativeai as genai
from ..config import get_settings


class GeminiService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            settings = get_settings()
            genai.configure(api_key=settings.GOOGLE_API_KEY)
            cls._instance._model = genai.GenerativeModel(settings.GEMINI_MODEL)
        return cls._instance

    async def generate_response(self, conversation_history: list[dict], message: str) -> str:
        chat = self._model.start_chat(history=conversation_history)
        response = await chat.send_message_async(message)
        return response.text

    async def stream_response(self, conversation_history: list[dict], message: str):
        chat = self._model.start_chat(history=conversation_history)
        response = await chat.send_message_async(message, stream=True)
        async for chunk in response:
            if chunk.text:
                yield chunk.text


gemini_service = GeminiService()
